"use client"

import { SectionHeader } from "@/components/SectionHeader";
import { CTAButton } from "@/components/CTAButton";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { FaLinkedin, FaWhatsapp } from "react-icons/fa";

const contactDetails = [
    { icon: FiMail, text: "contact@revocarriere.com", href:"mailto:contact@revocarriere.com" },
    { icon: FaWhatsapp, text: "WhatsApp Business", href:"https://wa.me/123456789" },
    { icon: FaLinkedin, text: "LinkedIn", href:"https://linkedin.com/in/yourprofile" },
    { icon: FiMapPin, text: "Cotonou, Bénin", href:"#" },
]

export default function ContactPage() {
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert("Merci pour votre message ! Nous vous répondrons dans les plus brefs délais.");
        // In a real app, you would handle form submission here.
        (e.target as HTMLFormElement).reset();
    };

  return (
    <>
      <SectionHeader
        title="Contactez-nous"
        subtitle="Une question ? Un projet ? Nous sommes à votre écoute pour discuter de votre avenir."
      />

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-dark-blue mb-6">Envoyer un message</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Nom</label>
                <input type="text" id="name" name="name" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
                <input type="email" id="email" name="email" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">Téléphone</label>
                <input type="tel" id="phone" name="phone" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">Message</label>
                <textarea id="message" name="message" rows={5} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"></textarea>
              </div>
              <CTAButton type="submit" className="w-full">Envoyer</CTAButton>
            </form>
          </div>

          {/* Contact Details */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-dark-blue">Informations de contact</h3>
            {contactDetails.map(detail => (
                <a key={detail.text} href={detail.href} target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow">
                    <detail.icon className="text-primary text-2xl mr-4"/>
                    <span className="text-gray-700 text-lg">{detail.text}</span>
                </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
