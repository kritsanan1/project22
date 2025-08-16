
import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { 
  Calendar, 
  Lightbulb, 
  Target, 
  BarChart3, 
  Users, 
  Share2,
  PenTool,
  ArrowRight,
  CheckCircle,
  Star,
  Zap,
  Globe,
  Sparkles,
  TrendingUp,
  Shield,
  Clock
} from 'lucide-react';

const Landing = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: Calendar,
      title: "Smart Content Calendar",
      description: "Plan, schedule, and visualize your content strategy across all platforms",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop"
    },
    {
      icon: Lightbulb,
      title: "AI-Powered Ideation",
      description: "Never run out of content ideas with our intelligent suggestion engine",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&h=400&fit=crop"
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Track performance, measure ROI, and optimize your content strategy",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Work seamlessly with your team on content creation and approval workflows",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Content Marketing Manager",
      company: "TechFlow",
      content: "ContentFlow transformed our content strategy. We've seen a 300% increase in engagement!",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face"
    },
    {
      name: "Michael Chen",
      role: "Social Media Director",
      company: "GrowthLab",
      content: "The AI-powered insights have revolutionized how we create content. Simply incredible.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face"
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Lead",
      company: "InnovateCorp",
      content: "Best content management platform we've ever used. The team collaboration features are outstanding.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-white to-sage/5">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 lg:pt-28 lg:pb-24">
        <div className="absolute inset-0 bg-gradient-to-r from-sage/10 via-transparent to-warm-blue/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-sage rounded-xl flex items-center justify-center">
                  <PenTool className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-neutral-800">ContentFlow</span>
                <div className="flex items-center space-x-1 bg-warm-amber/10 px-3 py-1 rounded-full">
                  <Sparkles className="w-3 h-3 text-warm-amber" />
                  <span className="text-xs font-medium text-warm-amber">AI-Powered</span>
                </div>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-neutral-900 mb-6 leading-tight">
                Transform Your
                <span className="bg-gradient-to-r from-sage to-warm-blue bg-clip-text text-transparent"> Content Strategy</span>
              </h1>
              
              <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                The most intelligent content planning and social media management platform. 
                Plan smarter, create faster, and grow your audience with AI-powered insights.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link href="/dashboard">
                  <button className="bg-sage text-white px-8 py-4 rounded-xl font-semibold hover:bg-sage/90 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    <span>Start Free Trial</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
                <button className="border-2 border-sage text-sage px-8 py-4 rounded-xl font-semibold hover:bg-sage hover:text-white transition-all duration-300">
                  Watch Demo
                </button>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-neutral-600">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-sage" />
                  <span>14-day free trial</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-sage" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-sage" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>
            
            <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-sage/20 to-warm-blue/20 rounded-3xl blur-3xl transform rotate-6" />
                <img 
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop" 
                  alt="ContentFlow Dashboard Preview"
                  className="relative rounded-3xl shadow-2xl w-full"
                />
                <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-xl border border-neutral-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-soft-emerald/10 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-soft-emerald" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-neutral-600">Engagement Rate</div>
                      <div className="text-2xl font-bold text-neutral-900">+127%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-neutral-600 mb-6">Trusted by 10,000+ content creators and marketing teams</p>
            <div className="flex items-center justify-center space-x-8 opacity-60">
              {[1,2,3,4,5].map(i => (
                <div key={i} className="w-24 h-12 bg-neutral-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-white to-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-neutral-900 mb-6">
              Everything you need to
              <span className="bg-gradient-to-r from-sage to-warm-blue bg-clip-text text-transparent"> scale your content</span>
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Powerful features designed to streamline your content workflow and maximize your social media impact.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                    activeFeature === index 
                      ? 'bg-sage text-white shadow-xl' 
                      : 'bg-white hover:bg-neutral-50 shadow-soft'
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      activeFeature === index ? 'bg-white/20' : 'bg-sage/10'
                    }`}>
                      <feature.icon className={`w-6 h-6 ${
                        activeFeature === index ? 'text-white' : 'text-sage'
                      }`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                      <p className={`${activeFeature === index ? 'text-white/90' : 'text-neutral-600'}`}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-sage/20 to-warm-blue/20 rounded-3xl blur-2xl" />
              <img 
                src={features[activeFeature].image}
                alt={features[activeFeature].title}
                className="relative rounded-3xl shadow-2xl w-full transition-opacity duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-sage text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { value: '10,000+', label: 'Active Users' },
              { value: '1M+', label: 'Posts Scheduled' },
              { value: '300%', label: 'Avg. Engagement Boost' },
              { value: '99.9%', label: 'Uptime' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-6">
              Loved by content creators worldwide
            </h2>
            <div className="flex justify-center space-x-1 mb-4">
              {[1,2,3,4,5].map(i => (
                <Star key={i} className="w-6 h-6 text-warm-amber fill-current" />
              ))}
            </div>
            <p className="text-neutral-600">4.9/5 from 2,000+ reviews</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-soft border border-neutral-100 hover:shadow-medium transition-shadow duration-300">
                <div className="flex space-x-1 mb-4">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-4 h-4 text-warm-amber fill-current" />
                  ))}
                </div>
                <p className="text-neutral-700 mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center space-x-3">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <div className="font-semibold text-neutral-900">{testimonial.name}</div>
                    <div className="text-sm text-neutral-600">{testimonial.role}, {testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-sage to-warm-blue text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Ready to transform your content strategy?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of successful content creators and start your free trial today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <button className="bg-white text-sage px-8 py-4 rounded-xl font-semibold hover:bg-neutral-50 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg">
                <span>Start Free Trial</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-sage transition-all duration-300">
              Schedule Demo
            </button>
          </div>
          <p className="text-sm text-white/70 mt-4">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-sage rounded-xl flex items-center justify-center">
                  <PenTool className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-bold">ContentFlow</span>
              </div>
              <p className="text-neutral-400 mb-6">
                The most intelligent content planning and social media management platform.
              </p>
              <div className="flex space-x-4">
                {[Share2, Globe, Users].map((Icon, index) => (
                  <div key={index} className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center hover:bg-sage transition-colors cursor-pointer">
                    <Icon className="w-5 h-5" />
                  </div>
                ))}
              </div>
            </div>
            
            {[
              { title: 'Product', links: ['Features', 'Pricing', 'Demo', 'API'] },
              { title: 'Company', links: ['About', 'Blog', 'Careers', 'Contact'] },
              { title: 'Support', links: ['Help Center', 'Documentation', 'Status', 'Community'] }
            ].map((section, index) => (
              <div key={index}>
                <h4 className="font-semibold mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-400 text-sm">
              © 2024 ContentFlow. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-neutral-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-neutral-400 hover:text-white text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-neutral-400 hover:text-white text-sm transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
