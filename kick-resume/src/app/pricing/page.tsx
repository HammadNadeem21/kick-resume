import React from "react";
import { Check, Zap, Crown, Rocket, ArrowRight, Star } from "lucide-react";
import { pricingPlans, reviews } from "@/lib/data";

const page = () => {
  return (
    <div className="max-w-[1600px] mx-auto ">
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="md:text-5xl lg:text-6xl text-3xl font-black mb-6 tracking-tight">
            <span
              className="bg-gradient-hero bg-clip-text text-transparent"
              style={{
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Simple, Transparent
            </span>
            <br />
            <span className="text-black">Pricing</span>
          </h1>
          <p className="md:text-xl lg:text-2xl text-[15px] text-gray-500 max-w-3xl mx-auto leading-relaxed">
            Choose the perfect plan for your career goals. Upgrade or downgrade
            at any time.
          </p>
        </div>
      </section>

      <section className="py-20 relative ">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center flex-wrap gap-8">
            {pricingPlans.map((plan, index) => (
              <div
                key={plan.name}
                className={`bg-gray-100 px-5 py-5 rounded-xl shadow-lg relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gray-200`}
              >
                {plan.badge && (
                  <div className="absolute top-6 left-6">
                    <div className="bg-blue-500 text-white text-xs rounded-lg py-1 px-2">
                      {plan.badge}
                    </div>
                  </div>
                )}

                <div className="text-center pb-8 pt-12">
                  <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-button">
                    <plan.icon className="h-8 w-8 text-mySkyBlue" />
                  </div>
                  <h1 className="md:text-2xl text-xl font-bold text-gray-500">
                    {plan.name}
                  </h1>
                  <p className=" text-gray-500 md:text-lg text-sm">
                    {plan.description}
                  </p>
                  <div className="pt-6">
                    {/* <div className="flex items-baseline justify-center">
                      <span className="text-5xl font-black text-foreground">
                        ${isAnnual ? plan.price.annual : plan.price.monthly}
                      </span>
                      {plan.price.monthly > 0 && (
                        <span className="text-muted-foreground ml-2">
                          /{isAnnual ? "month" : "month"}
                        </span>
                      )}
                    </div> */}
                    {/* {isAnnual && plan.price.monthly > 0 && (
                      <p className="text-sm text-muted-foreground mt-2">
                        Billed annually (${plan.price.annual * 12}/year)
                      </p>
                    )} */}
                  </div>
                </div>

                <div className="space-y-6 ">
                  <button
                    className={`w-full bg-mySkyBlue shadow-xl text-white flex items-center justify-center gap-2 rounded-xl py-1 px-2`}
                  >
                    {plan.cta}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-500">
                      What&apos;s included:
                    </h4>
                    <ul className="space-y-3 text-gray-500">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <Check className="h-5 w-5  mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-sm ">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="md:text-5xl lg:text-6xl text-3xl font-black mb-6 tracking-tight">
            <span
              className="bg-gradient-hero bg-clip-text text-transparent"
              style={{
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Loved by
            </span>
            <br />
            <span className="text-black">Professionals</span>
          </h1>
          <p className="md:text-xl lg:text-2xl text-[15px] text-gray-500 max-w-3xl mx-auto leading-relaxed">
            Choose the perfect plan for your career goals. Upgrade or downgrade
            at any time.
          </p>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((reviews, index) => (
              <div
                key={index}
                className="bg-gray-100 backdrop-blur-xl shadow-lg hover:shadow-xl transition-premium rounded-xl"
              >
                <div className="p-8">
                  <div className="flex mb-4">
                    {[...Array(reviews.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <div className="text-muted-foreground mb-6 leading-relaxed">
                    {reviews.content}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">
                      {reviews.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {reviews.role} at {reviews.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sm:py-10 py-2">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="md:text-5xl lg:text-6xl text-3xl font-black mb-6 tracking-tight">
            <span className="text-black">Frequently Asked</span>
            <br />
            <span
              className="bg-gradient-hero bg-clip-text text-transparent"
              style={{
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Questions
            </span>
          </h1>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="sm:py-5 py-1 mb-3">
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-6">
            {[
              {
                q: "Can I switch plans at any time?",
                a: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.",
              },
              {
                q: "Is there a free trial for paid plans?",
                a: "Yes, we offer a 7-day free trial for both Pro and Enterprise plans. No credit card required.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards, PayPal, and bank transfers for Enterprise customers.",
              },
              {
                q: "Can I cancel my subscription anytime?",
                a: "Absolutely! You can cancel your subscription at any time. You'll continue to have access until the end of your billing period.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-gray-100 backdrop-blur-xl rounded-xl"
              >
                <div className="p-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    {faq.q}
                  </h3>
                  <p className="text-gray-500">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
