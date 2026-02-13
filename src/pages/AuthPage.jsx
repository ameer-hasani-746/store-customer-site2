import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Loader2, ArrowRight, Github, Chrome, LogIn, UserPlus, Sun, Moon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import LanguageSelector from '../components/LanguageSelector';

const AuthPage = () => {
    const { lang, t } = useLanguage();
    const { theme, toggleTheme } = useTheme();
    const [isLogin, setIsLogin] = useState(true);
    const [isMagicLink, setIsMagicLink] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { signIn, signUp, signInWithGoogle, signInWithGithub, signInWithMagicLink } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isMagicLink) {
                const { error } = await signInWithMagicLink(email);
                if (error) throw error;
                alert('Magic link sent! Check your inbox to log in instantly.');
            } else if (isLogin) {
                const { error } = await signIn(email, password);
                if (error) throw error;
            } else {
                const { error } = await signUp(email, password);
                if (error) throw error;
                alert('Verification email sent! Please check your inbox.');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSocialLogin = async (provider) => {
        setLoading(true);
        setError(null);
        try {
            const { error } = provider === 'google' ? await signInWithGoogle() : await signInWithGithub();
            if (error) throw error;
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center p-4 selection:bg-indigo-500/30">
            {/* Theme & Language Controls */}
            <div className="fixed top-6 right-6 left-6 flex justify-end gap-3 z-50">
                <LanguageSelector />
                <button
                    onClick={toggleTheme}
                    className="p-3 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--glass-bg)] transition-all shadow-lg"
                    title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                >
                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </button>
            </div>
            {/* Background Decoration */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-[440px] relative"
            >
                <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-3xl p-8 md:p-10 shadow-2xl backdrop-blur-sm relative overflow-hidden">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mx-auto flex items-center justify-center text-white font-bold text-3xl shadow-lg shadow-indigo-500/20 mb-6"
                        >
                            S
                        </motion.div>
                        <h1 className="text-3xl font-display font-bold text-[var(--text-primary)] mb-2 tracking-tight">
                            {isMagicLink ? t('instantAccess') : isLogin ? t('welcomeBack') : t('createAccount')}
                        </h1>
                        <p className="text-[var(--text-secondary)]">
                            {isMagicLink
                                ? t('magicLinkDescription')
                                : isLogin
                                    ? t('signInDescription')
                                    : t('signUpDescription')}
                        </p>
                    </div>

                    {/* Social Auth */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <button
                            onClick={() => handleSocialLogin('google')}
                            className="flex items-center justify-center gap-2 py-3 px-4 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] hover:bg-[var(--glass-bg)] transition-all"
                        >
                            <Chrome size={20} />
                            <span className="text-sm font-medium">{t('google')}</span>
                        </button>
                        <button
                            onClick={() => handleSocialLogin('github')}
                            className="flex items-center justify-center gap-2 py-3 px-4 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] hover:bg-[var(--glass-bg)] transition-all"
                        >
                            <Github size={20} />
                            <span className="text-sm font-medium">{t('github')}</span>
                        </button>
                    </div>

                    <div className="relative mb-8">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[var(--border-color)]"></div></div>
                        <div className="relative flex justify-center text-xs uppercase"><span className="px-3 bg-[var(--bg-secondary)] text-[var(--text-muted)] tracking-widest font-bold">{t('orContinueWith')}</span></div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-[var(--text-secondary)] ml-1">{t('emailLabel')}</label>
                            <div className="relative group">
                                <Mail className={`absolute ${lang === 'ar' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-[var(--text-muted)] group-focus-within:text-indigo-400 transition-colors`} size={18} />
                                <input
                                    required
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@company.com"
                                    className={`w-full bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-xl py-4 ${lang === 'ar' ? 'pr-12 pl-4 text-right' : 'pl-12 pr-4'} text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all`}
                                />
                            </div>
                        </div>

                        {!isMagicLink && (
                            <div className="space-y-2">
                                <div className="flex justify-between items-center ml-1">
                                    <label className="text-sm font-medium text-[var(--text-secondary)]">{t('passwordLabel')}</label>
                                    {isLogin && (
                                        <button
                                            type="button"
                                            onClick={() => setIsMagicLink(true)}
                                            className="text-xs text-indigo-400 hover:text-indigo-300 font-medium tracking-tight"
                                        >
                                            {t('useMagicLink')}
                                        </button>
                                    )}
                                </div>
                                <div className="relative group">
                                    <Lock className={`absolute ${lang === 'ar' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-[var(--text-muted)] group-focus-within:text-indigo-400 transition-colors`} size={18} />
                                    <input
                                        required
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className={`w-full bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-xl py-4 ${lang === 'ar' ? 'pr-12 pl-4 text-right' : 'pl-12 pr-4'} text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all`}
                                    />
                                </div>
                            </div>
                        )}

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs leading-relaxed max-h-24 overflow-y-auto scrollbar-thin scrollbar-thumb-red-500/20"
                            >
                                {error}
                            </motion.div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed group h-14"
                        >
                            {loading ? (
                                <Loader2 className="animate-spin" size={20} />
                            ) : (
                                <>
                                    {isMagicLink ? t('sendMagicLink') : isLogin ? t('signIn') : t('signUp')}
                                    <ArrowRight size={18} className={`${lang === 'ar' ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'} transition-transform`} />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Switch Toggle */}
                    <div className="mt-8 pt-8 border-t border-[var(--border-color)] text-center space-y-4">
                        <button
                            onClick={() => {
                                setIsLogin(!isLogin);
                                setIsMagicLink(false);
                            }}
                            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-sm font-medium flex items-center justify-center gap-2 mx-auto"
                        >
                            {isLogin ? (
                                <>
                                    <UserPlus size={18} className="text-indigo-400" />
                                    {t('newHere')} <span className="text-indigo-400 underline underline-offset-4">{t('createAccount')}</span>
                                </>
                            ) : (
                                <>
                                    <LogIn size={18} className="text-indigo-400" />
                                    {t('alreadyHaveAccount')} <span className="text-indigo-400 underline underline-offset-4">{t('signIn')}</span>
                                </>
                            )}
                        </button>

                        {isMagicLink && (
                            <button
                                onClick={() => setIsMagicLink(false)}
                                className="text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
                            >
                                {t('backToPassword')}
                            </button>
                        )}
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-[var(--text-muted)] text-xs font-medium tracking-widest uppercase">
                        Experience the Future of Retail
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default AuthPage;
