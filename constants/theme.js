import { PixelRatio } from "react-native";


// PixelRatio  for Ios and Android , to Adjust the Text for any Size Screen
const fontScale = PixelRatio.getFontScale();
export const SIZES = {
    small : 9 * fontScale,
    medium : 14 * fontScale,
    large : 18 * fontScale,
    xLarge : 24 * fontScale,
}

export const COLORS = {
    bg: '#111827',
    cardBg : '#1F2937',
    second : '#4F46E5',
    white : '#FFF',
    black : '#000',
    gray : '#ddd',
}

export const FONTS = {
    bold : 'InterBold',
    light : 'InterLight',
    medium : 'InterMedium',
    regular : 'InterRegular',
    semiBold : 'InterSemiBold',
}