import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Star, Zap, ArrowRight, Shield, Headphones, Globe } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useSubscription } from '../hooks/useSubscription';
import PaymentModal from '../components/Payment/PaymentModal';
import { pricingConfig } from '../config/pricing';

const Pricing: React.FC = () => {
  const [isYearly, setIsYearly] = useState(false);
  const { user } = useAuth();
  const { subscription } = useSubscription();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(0);

  const plans = [
    {
      name: pricingConfig.plans.free.name,
      price: { monthly: pricingConfig.plans.free.price, yearly: pricingConfig.plans.free.price },
      description: 'Perfect for getting started with trading journaling',
      features: pricingConfig.plans.free.features,
      popular: false,
      buttonText: 'Get Started Free',
      buttonStyle: 'bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-300',
      icon: Zap,
      gradient: 'from-gray-400 to-gray-600'
    },
    {
      name: pricingConfig.plans.pro.name,
      price: { 
        monthly: pricingConfig.plans.pro.price, 
        yearly: Math.round(pricingConfig.plans.pro.price * 0.8) // 20% discount for yearly
      },
      description: 'Advanced features for serious traders',
      features: pricingConfig.plans.pro.features,
      popular: true,
      buttonText: subscription?.plan === 'pro' ? 'Current Plan' : 'Start Pro Trial',
      buttonStyle: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700',
      icon: Star,
      gradient: 'from-blue-500 to-purple-600'
    }
  ];

  const faqs = [
    {
      question: 'Can I change my plan anytime?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we\'ll prorate the billing accordingly.'
    },
    {
      question: 'Is there a free trial?',
      answer: 'Yes! We offer a 14-day free trial for our Pro plan. No credit card required to get started.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'For Pakistan: NayaPay and bank transfers. For international users: Binance and cryptocurrency payments.'
    },
    {
      question: 'Can I cancel anytime?',
      answer: 'Absolutely. You can cancel your subscription at any time from your account settings. Your account will remain active until the end of your billing period.'
    },
    {
      question: 'Is my trading data secure?',
      answer: 'Yes, we use enterprise-grade security measures including encryption and secure data centers to protect your information.'
    },
    {
      question: 'Do you offer refunds?',
      answer: 'We offer a 30-day money-back guarantee for all paid plans. If you\'re not satisfied, we\'ll refund your payment.'
    }
  ];

  const handlePlanSelect = () => {
    if (!user) {
      // Redirect to signup if not logged in
      return;
    }
    
    const price = isYearly 
      ? plans[1].price.yearly * 12
      : plans[1].price.monthly;
    
    setSelectedPrice(price);
    setShowPaymentModal(true);
  };

  // Check if user already has the Pro plan
  const isCurrentPlan = subscription?.plan === 'pro' && !subscription?.trialActive;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Choose the perfect plan for your trading journey. Start free and upgrade as you grow.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className={`text-sm font-medium ${!isYearly ? 'text-white' : 'text-blue-200'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                isYearly ? 'bg-blue-500' : 'bg-blue-400'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isYearly ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${isYearly ? 'text-white' : 'text-blue-200'}`}>
              Yearly
            </span>
            <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full font-medium animate-pulse">
              Save 20%
            </span>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl border-2 p-8 transition-all duration-300 hover:shadow-xl ${
                plan.popular
                  ? 'border-blue-500 dark:border-blue-500 bg-blue-50 dark:bg-blue-900/20 transform scale-105 shadow-lg'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-current" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

              <div className="text-center">
                <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${plan.gradient} rounded-lg mb-4`}>
                  <plan.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    ${isYearly ? plan.price.yearly : plan.price.monthly}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400 ml-1">
                    {plan.price.monthly > 0 ? '/month' : ''}
                  </span>
                  {isYearly && plan.price.monthly > 0 && (
                    <div className="text-sm text-green-600 dark:text-green-400 mt-1">
                      Billed annually (${plan.price.yearly * 12}/year)
                    </div>
                  )}
                </div>

                {index === 0 ? (
                  <Link
                    to={user ? "/dashboard" : "/signup"}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 mb-8 inline-block transform hover:scale-105 ${plan.buttonStyle}`}
                  >
                    {plan.buttonText}
                  </Link>
                ) : (
                  <button
                    onClick={handlePlanSelect}
                    disabled={isCurrentPlan}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 mb-8 inline-block transform hover:scale-105 ${plan.buttonStyle} ${isCurrentPlan ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {plan.buttonText}
                  </button>
                )}
              </div>

              <ul className="space-y-4">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start space-x-3">
                    <Check className="h-5 w-5 text-green-500 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Features Comparison */}
      <div className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose ZellaX?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Built by traders, for traders
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Global Reach</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Trusted by traders in over 100 countries worldwide with 24/7 support.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Bank-Level Security</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Your data is protected with enterprise-grade encryption and security measures.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Expert Support</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Get help from our team of trading experts and technical support specialists.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 dark:bg-gray-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{faq.question}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Trading Better?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of traders who have improved their performance with ZellaX
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={user ? "/dashboard" : "/signup"}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 inline-flex items-center justify-center group"
            >
              {user ? "Go to Dashboard" : "Start Free Trial"}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <PaymentModal
          onClose={() => setShowPaymentModal(false)}
          selectedPlan="pro"
          planPrice={selectedPrice}
        />
      )}
    </div>
  );
};

export default Pricing;