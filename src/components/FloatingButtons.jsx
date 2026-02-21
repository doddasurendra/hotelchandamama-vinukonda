import { MessageCircle, Phone } from 'lucide-react';
import { getSingle, TABLES } from '../db/database';

export default function FloatingButtons() {
    const content = getSingle(TABLES.SITE_CONTENT) || {};
    const phone = content.phone || '09989324091';
    const whatsapp = content.whatsapp || '09989324091';
    const waNumber = '91' + whatsapp.replace(/^0/, '');

    return (
        <>
            {/* WhatsApp */}
            <a
                href={`https://wa.me/${waNumber}?text=Hello%20Hotel%20Chandamama!%20I%20would%20like%20to%20know%20more.`}
                target="_blank"
                rel="noreferrer"
                className="floating-btn"
                style={{ bottom: '84px', right: '16px', background: '#25D366' }}
                title="WhatsApp Us">
                <MessageCircle size={24} className="text-white" />
            </a>

            {/* Call */}
            <a
                href={`tel:${phone}`}
                className="floating-btn"
                style={{ bottom: '20px', right: '16px', background: 'linear-gradient(135deg, #00bbc4, #006b71)' }}
                title="Call Us">
                <Phone size={22} className="text-white" />
            </a>
        </>
    );
}
