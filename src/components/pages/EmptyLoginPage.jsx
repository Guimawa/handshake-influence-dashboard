import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight,
  User
} from 'lucide-react';

export default function EmptyLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <motion.div
      className="
        min-h-screen flex items-center justify-center p-4
        bg-gradient-to-b from-[#212837] to-[#232B3E]
      "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.12, ease: [0.23, 1, 0.32, 1] }}
    >
      <motion.div
        className="
          w-full max-w-md bg-[#232B3E] rounded-2xl shadow-panel p-12
          border border-[#222C3B]
        "
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.12, ease: [0.23, 1, 0.32, 1] }}
      >
        {/* Logo/Brand placeholder */}
        <div className="text-center mb-8">
          <motion.div
            className="
              w-16 h-16 bg-[#3B82F6] rounded-2xl flex items-center justify-center
              mx-auto mb-4 shadow-lg
            "
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.12 }}
          >
            <User className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-2xl font-bold text-[#F1F5F9] mb-2">
            Connexion
          </h1>
          <p className="text-[#AAB7C6] text-sm">
            Aucun compte connecté
          </p>
        </div>

        {/* Formulaire de connexion */}
        <form className="space-y-6" role="form">
          {/* Champ Email */}
          <div>
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-[#F1F5F9] mb-2"
            >
              Adresse email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#AAB7C6] w-4 h-4" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                className="
                  w-full pl-10 pr-4 py-3 bg-[#222C3B] border border-[#222C3B] 
                  rounded-lg text-[#F1F5F9] placeholder-[#AAB7C6]
                  focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent
                  transition-all duration-120
                "
                disabled
                aria-describedby="email-help"
              />
            </div>
            <p id="email-help" className="text-xs text-[#AAB7C6] mt-1">
              Champ désactivé - Aucun compte disponible
            </p>
          </div>

          {/* Champ Mot de passe */}
          <div>
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-[#F1F5F9] mb-2"
            >
              Mot de passe
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#AAB7C6] w-4 h-4" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="
                  w-full pl-10 pr-12 py-3 bg-[#222C3B] border border-[#222C3B] 
                  rounded-lg text-[#F1F5F9] placeholder-[#AAB7C6]
                  focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent
                  transition-all duration-120
                "
                disabled
                aria-describedby="password-help"
              />
              <button
                type="button"
                className="
                  absolute right-3 top-1/2 transform -translate-y-1/2
                  text-[#AAB7C6] hover:text-white transition-colors
                  focus:outline-none focus:ring-2 focus:ring-[#3B82F6] rounded
                "
                onClick={() => setShowPassword(!showPassword)}
                disabled
                aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p id="password-help" className="text-xs text-[#AAB7C6] mt-1">
              Champ désactivé - Aucun compte disponible
            </p>
          </div>

          {/* Lien Mot de passe oublié */}
          <div className="text-right">
            <button
              type="button"
              className="
                text-sm text-[#3B82F6] hover:text-[#2563eb] 
                transition-colors focus:outline-none focus:ring-2 focus:ring-[#3B82F6] rounded
                disabled:opacity-50 disabled:cursor-not-allowed
              "
              disabled
            >
              Mot de passe oublié ?
            </button>
          </div>

          {/* Bouton Connexion */}
          <motion.button
            type="submit"
            className="
              w-full flex items-center justify-center gap-2 py-3 px-4
              bg-[#3B82F6] text-white font-semibold rounded-lg
              hover:bg-[#2563eb] transition-colors
              focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:ring-offset-2
              disabled:opacity-50 disabled:cursor-not-allowed
            "
            disabled
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.12 }}
          >
            <span>Se connecter</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </form>

        {/* Empty message */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.12, delay: 0.1 }}
        >
          <p className="text-sm text-[#AAB7C6]">
            Aucun compte connecté
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
