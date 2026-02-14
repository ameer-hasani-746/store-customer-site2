import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
    en: {
        appName: 'StoreDash',
        welcomeBack: 'Welcome Back',
        createAccount: 'Create Account',
        instantAccess: 'Instant Access',
        signInDescription: 'Enter your credentials to access your store.',
        signUpDescription: 'Join us and start building your collection.',
        magicLinkDescription: "We'll send a secure login link to your email.",
        emailLabel: 'Email Address',
        passwordLabel: 'Password',
        signIn: 'Sign In',
        signUp: 'Sign Up',
        google: 'Google',
        github: 'GitHub',
        orContinueWith: 'Or continue with',
        useMagicLink: 'Use Magic Link?',
        sendMagicLink: 'Send Magic Link',
        newHere: 'New here?',
        alreadyHaveAccount: 'Already have an account?',
        backToPassword: 'Back to Password Login',
        searchPlaceholder: 'Search products...',
        categories: 'Categories',
        allProducts: 'All Products',
        signOut: 'Sign Out',
        inStock: 'In Stock',
        outOfStock: 'Out of Stock',
        priceLabel: 'Price',
        priceLowToHigh: 'Price: Low to High',
        priceHighToLow: 'Price: High to Low',
        newest: 'Newest First',
        nameAZ: 'Name: A-Z',
        nameZA: 'Name: Z-A',
        addToCart: 'Add to Cart',
        viewDetails: 'View Details',
        cart: 'Cart',
        emptyCart: 'Your cart is empty',
        checkout: 'Checkout',
        subtotal: 'Subtotal',
        yourBag: 'Your Bag',
        items: 'items',
        orderConfirmed: 'Order Confirmed!',
        orderConfirmedDesc: 'Thank you for your purchase. Your order is being processed.',
        startShopping: 'Start Shopping',
        processing: 'Processing...',
        checkoutNow: 'Checkout Now',
        buyNow: 'Buy Now',
        backToInventory: 'Back to Inventory',
        backToStore: 'Back to Store',
        productNotFound: 'Product not found.',
        loadingStore: 'Loading Store...',
        failedLoadProducts: 'Failed to load products. Please try again later.',
        retryConnection: 'Retry Connection',
        premiumInventory: 'Premium Inventory',
        collection: 'Collection',
        heroDescription: 'Browse our exclusive selection of high-quality items. Real-time availability directly from our secure warehouse.',
        noItemsFound: 'No items found',
        tryAdjustingSearch: 'Try adjusting your search query.',
        chatHeader: 'Store Assistant',
        chatInitialMessage: 'Hello! How can I help you with our inventory today?',
        chatPlaceholder: 'Type a message...'
    },
    ar: {
        appName: 'ستور داش',
        welcomeBack: 'مرحباً بعودتك',
        createAccount: 'إنشاء حساب',
        instantAccess: 'دخول سريع',
        signInDescription: 'أدخل بياناتك للوصول إلى متجرك.',
        signUpDescription: 'انضم إلينا وابدأ في بناء مجموعتك.',
        magicLinkDescription: 'سنرسل رابط تسجيل دخول آمن إلى بريدك الإلكتروني.',
        emailLabel: 'عنوان البريد الإلكتروني',
        passwordLabel: 'كلمة المرور',
        signIn: 'تسجيل الدخول',
        signUp: 'إنشاء حساب',
        google: 'جوجل',
        github: 'جيت هاب',
        orContinueWith: 'أو الاستمرار بواسطة',
        useMagicLink: 'استخدام رابط سحري؟',
        sendMagicLink: 'إرسال رابط سحري',
        newHere: 'جديد هنا؟',
        alreadyHaveAccount: 'لديك حساب بالفعل؟',
        backToPassword: 'العودة لتسجيل الدخول بكلمة المرور',
        searchPlaceholder: 'البحث عن منتجات...',
        categories: 'الفئات',
        allProducts: 'جميع المنتجات',
        signOut: 'تسجيل الخروج',
        inStock: 'متوفر في المخزون',
        outOfStock: 'غير متوفر',
        priceLabel: 'السعر',
        priceLowToHigh: 'السعر: من الأقل للأعلى',
        priceHighToLow: 'السعر: من الأعلى للأقل',
        newest: 'الأحدث أولاً',
        nameAZ: 'الاسم: أ-ي',
        nameZA: 'الاسم: ي-أ',
        addToCart: 'أضف إلى السلة',
        viewDetails: 'عرض التفاصيل',
        cart: 'السلة',
        emptyCart: 'سلة التسوق فارغة',
        checkout: 'الدفع',
        subtotal: 'المجموع الفرعي',
        yourBag: 'حقيبتك',
        items: 'عناصر',
        orderConfirmed: 'تم تأكيد الطلب!',
        orderConfirmedDesc: 'شكراً لك على الشراء. جاري معالجة طلبك.',
        startShopping: 'ابدأ التسوق',
        processing: 'جاري المعالجة...',
        checkoutNow: 'إتمام الشراء الآن',
        buyNow: 'اشتري الآن',
        backToInventory: 'العودة للمخزون',
        backToStore: 'العودة للمتجر',
        productNotFound: 'المنتج غير موجود.',
        loadingStore: 'جاري تحميل المتجر...',
        failedLoadProducts: 'فشل تحميل المنتجات. يرجى المحاولة مرة أخرى لاحقاً.',
        retryConnection: 'إعادة المحاولة',
        premiumInventory: 'مخزون مميز',
        collection: 'مجموعة',
        heroDescription: 'تصفح تشكيلتنا الحصرية من العناصر عالية الجودة. توفر في الوقت الحقيقي مباشرة من مستودعنا المؤمن.',
        noItemsFound: 'لم يتم العثور على عناصر',
        tryAdjustingSearch: 'حاول تعديل استعلام البحث الخاص بك.',
        chatHeader: 'مساعد المتجر',
        chatInitialMessage: 'مرحباً! كيف يمكنني مساعدتك في استكشاف متجرنا اليوم؟',
        chatPlaceholder: 'اكتب رسالة...'
    }
};

export const LanguageProvider = ({ children }) => {
    const [lang, setLang] = useState(() => {
        return localStorage.getItem('store_lang') || 'en';
    });

    useEffect(() => {
        localStorage.setItem('store_lang', lang);
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    }, [lang]);

    const toggleLanguage = () => {
        setLang(prev => prev === 'en' ? 'ar' : 'en');
    };

    const t = (key) => {
        if (!translations[lang]) return key;
        return translations[lang][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) throw new Error('useLanguage must be used within LanguageProvider');
    return context;
};
