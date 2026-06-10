import ContactInfo from '@/components/contact-info'
import { Button } from '@/components/ui/button'
import {
  formatBusinessAddress,
  getGoogleMapsEmbedUrl,
  getGoogleMapsUrl,
  phoneDisplay,
  phoneTelHref,
  whatsAppHref,
} from '@/lib/business'

interface ContactSidebarProps {
  title?: string
  hoursVariant?: 'short' | 'long'
  showSpoedNote?: boolean
  showMap?: boolean
  showSpoedCta?: boolean
  showWhatsApp?: boolean
}

export default function ContactSidebar({
  title = 'Contactgegevens',
  hoursVariant = 'short',
  showSpoedNote = false,
  showMap = false,
  showSpoedCta = false,
  showWhatsApp = false,
}: ContactSidebarProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
        <h2 className="heading-subsection mb-6 text-kms-navy">{title}</h2>
        <ContactInfo
          hoursVariant={hoursVariant}
          showSpoedNote={showSpoedNote}
        />

        {showSpoedCta ? (
          <div className="mt-8 rounded-xl bg-kms-light p-4">
            <p className="mb-1 text-xs font-medium uppercase tracking-wider text-gray-500">Spoed?</p>
            <p className="mb-3 text-sm text-gray-600">Bel ons direct, ook buiten kantooruren.</p>
            <Button render={<a href={phoneTelHref} />} nativeButton={false} variant="spoed" className="w-full">
              {phoneDisplay}
            </Button>
          </div>
        ) : null}

        {showWhatsApp ? (
          <div className="mt-6">
            <Button
              render={<a href={whatsAppHref} target="_blank" rel="noopener noreferrer" />}
              nativeButton={false}
              variant="secondary"
              className="w-full"
            >
              WhatsApp ons
            </Button>
          </div>
        ) : null}
      </div>

      {showMap ? (
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <iframe
            src={getGoogleMapsEmbedUrl()}
            title={`Kaart: KMS Installaties, ${formatBusinessAddress()}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="h-52 w-full border-0"
          />
          <div className="p-4">
            <a
              href={getGoogleMapsUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-kms-navy hover:underline"
            >
              Open in Google Maps &rarr;
            </a>
          </div>
        </div>
      ) : null}
    </div>
  )
}
