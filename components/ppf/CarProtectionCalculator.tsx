// components/ppf/CarProtectionCalculator.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import Icon from '@/components/ui/Icon';
import { useModalContext } from '@/contexts/ModalContext';
import zonesData from '@/data/ppf-zones.json';
import packagesData from '@/data/ppf-packages.json';
import ceramicPrices from '@/data/prices/ceramic.json';
import ppfPrices from '@/data/prices/ppf.json';

interface CarZone {
  id: string;
  name: string;
  price: number;
  category: string;
}

interface Package {
  id: string;
  name: string;
  description: string;
  zones: string[];
  price: number;
  discount: number;
  popular?: boolean;
  bonus?: string;
}

const CAR_ZONES: CarZone[] = zonesData;
const PACKAGES: Package[] = packagesData;

const CATEGORY_LABELS: Record<string, string> = {
  front: 'Передняя часть',
  roof: 'Крыша',
  sides: 'Боковые элементы',
  rear: 'Задняя часть',
  full: 'Полное бронирование',
};

interface CarProtectionCalculatorProps {
  onSelectionChange?: (selectedZones: string[], totalPrice: number, bonus?: string) => void;
}

export default function CarProtectionCalculator({ onSelectionChange }: CarProtectionCalculatorProps) {
  const { openModal } = useModalContext();
  const [selectedZones, setSelectedZones] = useState<Set<string>>(new Set());
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'packages' | 'zones'>('packages');
  const [addCeramic, setAddCeramic] = useState(false);
  const [ceramicClass, setCeramicClass] = useState<'sedan' | 'business' | 'suv'>('sedan');
  const [ceramicType, setCeramicType] = useState<'base' | 'premium'>('base');

  const selectPackage = (packageId: string) => {
    const pkg = PACKAGES.find((p) => p.id === packageId);
    if (pkg) {
      setSelectedPackage(packageId);
      if (pkg.zones[0] === 'full_body') {
        setSelectedZones(new Set());
        setAddCeramic(false);
      } else {
        setSelectedZones(new Set(pkg.zones));
      }
    }
  };

  const toggleZone = (zoneId: string) => {
    setSelectedPackage(null);
    setSelectedZones((prev) => {
      const next = new Set(prev);
      next.has(zoneId) ? next.delete(zoneId) : next.add(zoneId);
      return next;
    });
  };

  // Цена бронирования
  const calculatePrice = useCallback(() => {
    if (selectedPackage) {
      const pkg = PACKAGES.find((p) => p.id === selectedPackage);
      if (pkg) {
        return Math.round(pkg.price * (1 - pkg.discount / 100));
      }
    }

    const sum = Array.from(selectedZones).reduce((total, zoneId) => {
      const zone = CAR_ZONES.find((z) => z.id === zoneId);
      return total + (zone?.price || 0);
    }, 0);

    const count = selectedZones.size;
    const discountTier = ppfPrices.discounts
      .slice()
      .reverse()
      .find((d) => count >= d.zones);
    const discount = discountTier?.percent || 0;

    return Math.round(sum * (1 - discount / 100));
  }, [selectedPackage, selectedZones]);

  const totalPrice = calculatePrice();

  // Скидка на керамику = скидка на бронирование
  const getCeramicDiscount = useCallback(() => {
    if (selectedPackage) {
      const pkg = PACKAGES.find((p) => p.id === selectedPackage);
      return pkg?.discount || 0;
    }
    const count = selectedZones.size;
    const discountTier = ppfPrices.discounts
      .slice()
      .reverse()
      .find((d) => count >= d.zones);
    return discountTier?.percent || 0;
  }, [selectedPackage, selectedZones]);

  const ceramicDiscount = getCeramicDiscount();

  const ceramicBasePrice =
    ceramicClass === 'sedan'
      ? ceramicType === 'base'
        ? ceramicPrices.classes[0].base
        : ceramicPrices.classes[0].premium
      : ceramicClass === 'business'
        ? ceramicType === 'base'
          ? ceramicPrices.classes[1].base
          : ceramicPrices.classes[1].premium
        : ceramicType === 'base'
          ? ceramicPrices.classes[2].base
          : ceramicPrices.classes[2].premium;

  const ceramicPrice = addCeramic
    ? Math.round(ceramicBasePrice * (1 - ceramicDiscount / 100))
    : 0;
  const grandTotal = totalPrice + ceramicPrice;

  const isFullBody = selectedPackage
    ? PACKAGES.find((p) => p.id === selectedPackage)?.id === 'full_body'
    : selectedZones.has('full_body');

  const getCurrentBonus = (): string | undefined => {
    if (selectedPackage) {
      const pkg = PACKAGES.find((p) => p.id === selectedPackage);
      if (pkg?.bonus) return pkg.bonus;
    }
    return undefined;
  };

  useEffect(() => {
    onSelectionChange?.(
      selectedPackage
        ? PACKAGES.find((p) => p.id === selectedPackage)?.zones || []
        : Array.from(selectedZones),
      grandTotal,
      getCurrentBonus()
    );
  }, [selectedZones, grandTotal, selectedPackage, addCeramic, ceramicClass, ceramicType]);

  const getZoneName = (zoneId: string) => CAR_ZONES.find((z) => z.id === zoneId)?.name || zoneId;
  const getZonePrice = (zoneId: string) => CAR_ZONES.find((z) => z.id === zoneId)?.price || 0;

  const selectedZonesList = Array.from(selectedZones);
  const selectedPackageData = selectedPackage ? PACKAGES.find((p) => p.id === selectedPackage) : null;
  const hasSelection = selectedZonesList.length > 0 || !!selectedPackageData;

  const getPackageSavings = () => {
    if (!selectedPackageData || selectedPackageData.discount === 0) return null;
    return {
      original: selectedPackageData.price,
      discounted: totalPrice,
      savings: selectedPackageData.price - totalPrice,
      percent: selectedPackageData.discount,
    };
  };

  const getManualDiscount = () => {
    if (selectedPackage || selectedZones.size < 3) return null;
    const fullPrice = Array.from(selectedZones).reduce((total, zoneId) => {
      const zone = CAR_ZONES.find((z) => z.id === zoneId);
      return total + (zone?.price || 0);
    }, 0);

    const count = selectedZones.size;
    const discountTier = ppfPrices.discounts
      .slice()
      .reverse()
      .find((d) => count >= d.zones);
    const percent = discountTier?.percent || 0;
    if (percent === 0) return null;

    return {
      original: fullPrice,
      discounted: totalPrice,
      savings: fullPrice - totalPrice,
      percent,
    };
  };

  const packageSavings = getPackageSavings();
  const manualDiscount = getManualDiscount();

  const handleOrderClick = () => {
    openModal({
      serviceType: 'ppf',
      selectedZones: selectedPackage ? selectedPackageData?.zones || [] : selectedZonesList,
      totalPrice: grandTotal,
    });
  };

  return (
    <div>
      {/* Вкладки */}
      <div className="flex gap-2 bg-bg-element rounded-xl p-1 w-fit mx-auto mb-8">
        <button
          onClick={() => setActiveTab('packages')}
          className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'packages' ? 'bg-accent text-bg-primary' : 'text-text-secondary hover:text-accent'
            }`}
        >
          <Icon name="FaBox" className="w-3.5 h-3.5 inline mr-2" />
          Готовые пакеты
        </button>
        <button
          onClick={() => setActiveTab('zones')}
          className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'zones' ? 'bg-accent text-bg-primary' : 'text-text-secondary hover:text-accent'
            }`}
        >
          <Icon name="FaList" className="w-3.5 h-3.5 inline mr-2" />
          Собрать самому
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* ========== ЛЕВАЯ КОЛОНКА ========== */}
        <div className="lg:col-span-2">
          {activeTab === 'packages' ? (
            <div className="space-y-3">
              {PACKAGES.map((pkg) => {
                const discounted = Math.round(pkg.price * (1 - pkg.discount / 100));
                const isSelected = selectedPackage === pkg.id;

                return (
                  <button
                    key={pkg.id}
                    onClick={() => selectPackage(pkg.id)}
                    className={`w-full text-left p-4 rounded-xl transition-all ${isSelected
                        ? 'bg-accent/20 border-2 border-accent'
                        : 'bg-bg-element border border-white/10 hover:bg-accent/10'
                      }`}
                  >
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${isSelected ? 'bg-accent text-bg-primary' : 'bg-accent/20 text-accent'
                            }`}
                        >
                          <Icon name="FaShieldAlt" className="text-sm" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{pkg.name}</span>
                            {pkg.popular && (
                              <span className="text-[10px] bg-accent/30 text-accent px-2 py-0.5 rounded-full">
                                Рекомендуем
                              </span>
                            )}
                          </div>
                          <p className="text-text-secondary text-xs">{pkg.description}</p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        {pkg.discount > 0 && (
                          <div className="text-text-secondary/50 line-through text-xs">
                            {pkg.price.toLocaleString()} ₽
                          </div>
                        )}
                        <div className="text-accent font-bold">
                          {discounted.toLocaleString()} ₽
                        </div>
                        {pkg.discount > 0 && (
                          <div className="text-green-400 text-[10px]">–{pkg.discount}%</div>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="space-y-4">
              {['front', 'roof', 'sides', 'rear', 'full'].map((category) => {
                const categoryZones = CAR_ZONES.filter((z) => z.category === category);
                if (categoryZones.length === 0) return null;

                return (
                  <div key={category}>
                    <h4 className="text-xs text-text-secondary/60 uppercase tracking-wider mb-2 px-1">
                      {CATEGORY_LABELS[category]}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {categoryZones.map((zone) => (
                        <button
                          key={zone.id}
                          onClick={() => toggleZone(zone.id)}
                          className={`flex justify-between items-center p-3 rounded-xl transition-all text-left ${selectedZones.has(zone.id)
                              ? 'bg-accent/20 border border-accent'
                              : 'bg-bg-element border border-white/10 hover:bg-accent/10'
                            }`}
                        >
                          <span className="text-sm pr-2">{zone.name}</span>
                          <span className="text-accent font-semibold text-sm shrink-0">
                            {zone.price.toLocaleString()} ₽
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ========== ПРАВАЯ КОЛОНКА ========== */}
        <div className="bg-bg-element rounded-xl p-6 sticky top-24 h-fit">
          <h4 className="font-semibold text-lg mb-4 flex items-center gap-2 border-b border-white/10 pb-3">
            <Icon name="FaShoppingCart" className="text-accent w-4 h-4" />
            Ваш выбор
          </h4>

          {!hasSelection ? (
            <div className="text-center py-8">
              <Icon name="FaHandPointer" className="text-3xl text-text-secondary/30 mb-3 mx-auto" />
              <p className="text-text-secondary text-sm">Выберите зоны или пакет</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Единая карточка выбора */}
              <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-accent font-semibold">
                      {selectedPackageData ? selectedPackageData.name : 'Свой набор'}
                    </p>
                    <p className="text-text-secondary text-xs mt-0.5">
                      {selectedPackageData
                        ? selectedPackageData.description
                        : `${selectedZonesList.length} зон выбрано`}
                    </p>
                  </div>
                  {selectedPackageData && (
                    <button
                      onClick={() => setSelectedPackage(null)}
                      className="text-text-secondary/50 hover:text-accent shrink-0 ml-2"
                    >
                      <Icon name="FaTimes" className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Список зон */}
                <div className="mb-3">
                  <p className="text-text-secondary/50 text-[10px] uppercase tracking-wider mb-1.5">
                    Что входит:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {(selectedPackageData
                      ? selectedPackageData.zones
                      : selectedZonesList
                    ).map((zoneId) => (
                      <span
                        key={zoneId}
                        className="bg-bg-secondary text-text-secondary text-[10px] px-2 py-0.5 rounded-full"
                      >
                        {getZoneName(zoneId)}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Выгода */}
                {(packageSavings || manualDiscount) && (
                  <div className="pt-3 border-t border-accent/20 space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-text-secondary">Без скидки:</span>
                      <span className="text-text-secondary/50 line-through">
                        {packageSavings
                          ? packageSavings.original.toLocaleString()
                          : manualDiscount!.original.toLocaleString()}{' '}
                        ₽
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary">Со скидкой:</span>
                      <span className="text-accent font-bold text-lg">
                        {packageSavings
                          ? packageSavings.discounted.toLocaleString()
                          : manualDiscount!.discounted.toLocaleString()}{' '}
                        ₽
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-green-400">
                        Скидка{' '}
                        {packageSavings
                          ? packageSavings.percent
                          : manualDiscount!.percent}
                        %
                      </span>
                      <span className="text-green-400 font-medium">
                        Экономия{' '}
                        {packageSavings
                          ? packageSavings.savings.toLocaleString()
                          : manualDiscount!.savings.toLocaleString()}{' '}
                        ₽
                      </span>
                    </div>
                  </div>
                )}

                {/* Бонус пакета */}
                {selectedPackageData?.bonus && (
                  <div className="pt-2 mt-2 border-t border-accent/20">
                    <p className="text-accent text-[10px]">🎁 {selectedPackageData.bonus}</p>
                  </div>
                )}
              </div>

              {/* Керамика */}
              {!isFullBody && (
                <div className="p-4 bg-bg-secondary rounded-lg space-y-3">
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={addCeramic}
                      onChange={(e) => setAddCeramic(e.target.checked)}
                      className="w-4 h-4 rounded border-white/20 bg-bg-element text-accent focus:ring-accent/50 mt-0.5"
                    />
                    <span className="text-text-secondary text-xs">
                      Добавить керамическое покрытие на незащищённые элементы
                    </span>
                  </label>

                  {addCeramic && (
                    <>
                      <div>
                        <p className="text-text-secondary/50 text-[10px] uppercase tracking-wider mb-2">
                          Класс автомобиля
                        </p>
                        <div className="space-y-1.5">
                          {ceramicPrices.classes.map((cls) => (
                            <button
                              key={cls.id}
                              onClick={() => setCeramicClass(cls.id as 'sedan' | 'business' | 'suv')}
                              className={`w-full text-left text-xs px-3 py-2 rounded-lg transition-all ${ceramicClass === cls.id
                                  ? 'bg-accent/20 text-accent'
                                  : 'bg-bg-element text-text-secondary hover:text-accent'
                                }`}
                            >
                              <span>{cls.name}</span>
                              <span className="text-text-secondary/50 ml-1">({cls.examples})</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-text-secondary/50 text-[10px] uppercase tracking-wider mb-2">
                          Тип покрытия
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          {ceramicPrices.types.map((type) => (
                            <button
                              key={type.id}
                              onClick={() => setCeramicType(type.id as 'base' | 'premium')}
                              className={`text-center text-xs px-3 py-2 rounded-lg transition-all ${ceramicType === type.id
                                  ? 'bg-accent/20 text-accent'
                                  : 'bg-bg-element text-text-secondary hover:text-accent'
                                }`}
                            >
                              <div className="font-medium">{type.name}</div>
                              <div className="text-text-secondary/50 text-[10px] mt-0.5">
                                {type.description}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {ceramicDiscount > 0 && (
                        <div className="bg-accent/5 rounded-lg p-3 text-center">
                          <p className="text-text-secondary text-[10px]">
                            {ceramicPrices.discountNote}
                          </p>
                          <p className="text-green-400 text-xs font-medium mt-0.5">
                            Ваша скидка: –{ceramicDiscount}%
                          </p>
                        </div>
                      )}

                      <div className="flex justify-between items-center pt-2 border-t border-white/5">
                        <span className="text-text-secondary text-xs">Керамика:</span>
                        <div className="text-right">
                          {ceramicDiscount > 0 && (
                            <div className="text-text-secondary/50 line-through text-[10px]">
                              {ceramicBasePrice.toLocaleString()} ₽
                            </div>
                          )}
                          <span className="text-accent font-bold">
                            {ceramicPrice.toLocaleString()} ₽
                          </span>
                        </div>
                      </div>
                      <p className="text-text-secondary/50 text-[10px]">
                        Точная стоимость после осмотра · Полировка включена
                      </p>
                    </>
                  )}
                </div>
              )}

              {/* Итого */}
              <div className="pt-4 border-t border-white/10 space-y-2">
                {ceramicPrice > 0 && (
                  <>
                    <div className="flex justify-between text-xs">
                      <span className="text-text-secondary">Бронирование:</span>
                      <span className="text-accent">{totalPrice.toLocaleString()} ₽</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-text-secondary">Керамика:</span>
                      <span className="text-accent">+{ceramicPrice.toLocaleString()} ₽</span>
                    </div>
                  </>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary font-medium">Итого:</span>
                  <span className="text-2xl font-bold text-accent">
                    {grandTotal.toLocaleString()} ₽
                  </span>
                </div>
                {getCurrentBonus() && (
                  <p className="text-accent text-xs text-center">
                    🎁 {getCurrentBonus()}
                  </p>
                )}

                <button
                  onClick={handleOrderClick}
                  className="w-full py-3 bg-accent hover:bg-accent-hover text-bg-primary rounded-xl transition-all font-medium mt-2"
                >
                  Оставить заявку
                </button>
              </div>
            </div>
          )}

          <div className="mt-4 p-3 bg-accent/5 rounded-lg text-text-secondary/60 text-xs flex items-start gap-2">
            <Icon name="FaInfoCircle" className="w-3.5 h-3.5 mt-0.5 shrink-0" />
            Цены ориентировочные. Точная стоимость после осмотра автомобиля.{' '}
            {ppfPrices.note}.
          </div>
        </div>
      </div>
    </div>
  );
}