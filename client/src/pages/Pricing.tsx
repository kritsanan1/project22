
import React, { useState } from 'react';
import { Link } from 'wouter';
import { 
  Check, 
  PenTool, 
  Zap, 
  Star, 
  Crown,
  Users,
  Calendar,
  BarChart3,
  Shield,
  Headphones,
  ArrowRight
} from 'lucide-react';

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: 'Starter',
      description: 'Perfect for individuals and small teams',
      icon: PenTool,
      color: 'sage',
      price: { monthly: 19, annual: 15 },
      features: [
        '5 social media accounts',
        '100 posts per month',
        'Content calendar',
        'Basic analytics',
        'Email support',
        'Content templates'
      ],
      cta: 'Start Free Trial',
      popular: false
    },
    {
      name: 'Professional',
      description: 'For growing businesses and agencies',
      icon: Zap,
      color: 'warm-blue',
      price: { monthly: 49, annual: 39 },
      features: [
        '15 social media accounts',
        'Unlimited posts',
        'Advanced analytics',
        'Team collaboration',
        'AI content suggestions',
        'Priority support',
        'Custom branding',
        'Bulk scheduling'
      ],
      cta: 'Start Free Trial',
      popular: true
    },
    {
      name: 'Enterprise',
      description: 'For large organizations with custom needs',
      icon: Crown,
      color: 'dusty-purple',
      price: { monthly: 199, annual: 159 },
      features: [
        'Unlimited accounts',
        'Unlimited posts',
        'Advanced AI features',
        'Custom integrations',
        'Dedicated support',
        'SLA guarantee',
        'Custom analytics',
        'White-label solution',
        'API access'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  const faqs = [
    {
      question: 'Can I change plans at any time?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.'
    },
    {
      question: 'Is there a free trial?',
      answer: 'We offer a 14-day free trial for all plans. No credit card required to start your trial.'
    },
    {
      question: 'What social media platforms are supported?',
      answer: 'We support 13+ platforms including Facebook, Instagram, Twitter, LinkedIn, YouTube, TikTok, and more.'
    },
    {
      question: 'Do you offer refunds?',
      answer: 'Yes, we offer a 30-day money-back guarantee if you\'re not completely satisfied with our service.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-white to-sage/5">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-neutral-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <Link href="/">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-sage rounded-xl flex items-center justify-center">
                  <PenTool className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg sm:text-xl font-semibold text-neutral-800">ContentFlow</span>
              </div>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <button className="text-neutral-600 hover:text-sage transition-colors">
                  Dashboard
                </button>
              </Link>
              <Link href="/dashboard">
                <button className="bg-sage text-white px-4 py-2 rounded-xl font-medium hover:bg-sage/90 transition-colors">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-neutral-900 mb-6">
            Choose the perfect plan for
            <span className="bg-gradient-to-r from-sage to-warm-blue bg-clip-text text-transparent"> your growth</span>
          </h1>
          <p className="text-lg text-neutral-600 mb-8">
            Start with our 14-day free trial. No credit card required. Cancel anytime.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-12">
            <span className={`font-medium ${!isAnnual ? 'text-neutral-900' : 'text-neutral-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                isAnnual ? 'bg-sage' : 'bg-neutral-300'
              }`}
            >
              <div className={`absolute w-5 h-5 bg-white rounded-full top-1 transition-transform ${
                isAnnual ? 'translate-x-8' : 'translate-x-1'
              }`} />
            </button>
            <span className={`font-medium ${isAnnual ? 'text-neutral-900' : 'text-neutral-500'}`}>
              Annual
            </span>
            <div className="bg-warm-amber/10 text-warm-amber px-3 py-1 rounded-full text-sm font-medium">
              Save 20%
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-3xl shadow-soft border hover:shadow-medium transition-all duration-300 ${
                  plan.popular 
                    ? 'border-sage scale-105 shadow-medium' 
                    : 'border-neutral-100 hover:border-sage/30'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-sage text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center space-x-1">
                      <Star className="w-4 h-4" />
                      <span>Most Popular</span>
                    </div>
                  </div>
                )}
                
                <div className="p-8">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`w-12 h-12 bg-${plan.color}/10 rounded-xl flex items-center justify-center`}>
                      <plan.icon className={`w-6 h-6 text-${plan.color}`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-neutral-900">{plan.name}</h3>
                      <p className="text-sm text-neutral-600">{plan.description}</p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-baseline space-x-1">
                      <span className="text-4xl font-bold text-neutral-900">
                        ${isAnnual ? plan.price.annual : plan.price.monthly}
                      </span>
                      <span className="text-neutral-600">/month</span>
                    </div>
                    {isAnnual && (
                      <p className="text-sm text-neutral-500 mt-1">
                        Billed annually (${plan.price.annual * 12}/year)
                      </p>
                    )}
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <Check className={`w-5 h-5 text-${plan.color} flex-shrink-0`} />
                        <span className="text-neutral-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link href={plan.name === 'Enterprise' ? '#contact' : '/dashboard'}>
                    <button className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                      plan.popular
                        ? 'bg-sage text-white hover:bg-sage/90 shadow-lg'
                        : 'border-2 border-sage text-sage hover:bg-sage hover:text-white'
                    }`}>
                      <span>{plan.cta}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-6">
              Compare all features
            </h2>
            <p className="text-lg text-neutral-600">
              See what's included in each plan to make the best choice for your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Users, title: 'Team Collaboration', description: 'Work together seamlessly' },
              { icon: Calendar, title: 'Content Planning', description: 'Plan and schedule content' },
              { icon: BarChart3, title: 'Advanced Analytics', description: 'Track performance metrics' },
              { icon: Shield, title: 'Enterprise Security', description: 'Bank-level security' },
              { icon: Headphones, title: '24/7 Support', description: 'Always here to help' },
              { icon: Zap, title: 'AI-Powered Insights', description: 'Smart content suggestions' }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-sage/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-sage" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">{feature.title}</h3>
                <p className="text-neutral-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-6">
              Frequently asked questions
            </h2>
            <p className="text-lg text-neutral-600">
              Have questions? We have answers.
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-soft">
                <h3 className="text-lg font-semibold text-neutral-900 mb-3">{faq.question}</h3>
                <p className="text-neutral-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-sage to-warm-blue text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to get started?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of successful content creators today.
          </p>
          <Link href="/dashboard">
            <button className="bg-white text-sage px-8 py-4 rounded-xl font-semibold hover:bg-neutral-50 transition-all duration-300 flex items-center justify-center space-x-2 mx-auto shadow-lg">
              <span>Start Your Free Trial</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
