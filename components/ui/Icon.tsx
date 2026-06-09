// components/ui/Icon.tsx
'use client';

import type { IconType } from 'react-icons';
import {
  FaShieldAlt, FaClock, FaMedal, FaHandshake,
  FaBrush, FaGem, FaCar, FaCheckCircle, FaChevronDown,
  FaChevronUp, FaChevronLeft, FaChevronRight,
  FaArrowRight, FaStar, FaRegStar, FaHeart, FaRegHeart,
  FaEye, FaPlay, FaPause, FaPlayCircle,
  FaVolumeUp, FaVolumeMute, FaPhoneAlt, FaMapMarkerAlt,
  FaTelegram, FaVk, FaInstagram, FaYandex,
  FaTimes, FaBars, FaPen, FaClock as FaClockIcon,
  FaTint, FaSun, FaFlask, FaMagic, FaQuestionCircle,
  FaInfoCircle, FaExclamationCircle, FaSpinner,
  FaBox, FaShoppingCart, FaHandPointer, FaGift,
  FaList
} from 'react-icons/fa';

const iconMap: Record<string, IconType> = {
  FaShieldAlt, FaClock, FaMedal, FaHandshake,
  FaBrush, FaGem, FaCar, FaCheckCircle, FaChevronDown,
  FaChevronUp, FaChevronLeft, FaChevronRight,
  FaArrowRight, FaStar, FaRegStar, FaHeart, FaRegHeart,
  FaEye, FaPlay, FaPause, FaPlayCircle,
  FaVolumeUp, FaVolumeMute, FaPhoneAlt, FaMapMarkerAlt,
  FaTelegram, FaVk, FaInstagram, FaYandex,
  FaTimes, FaBars, FaPen, FaClockIcon,
  FaTint, FaSun, FaFlask, FaMagic, FaQuestionCircle,
  FaInfoCircle, FaExclamationCircle, FaSpinner,
  FaBox, FaShoppingCart, FaHandPointer, FaGift,
  FaList
};

interface IconProps {
  name: string;
  className?: string;
}

export default function Icon({ name, className = '' }: IconProps) {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in iconMap`);
    return null;
  }

  return <IconComponent className={className} />;
}