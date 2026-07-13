import { CalendarClock, CircleCheckBig, ClipboardList, FileText, type LucideIcon } from 'lucide-react'

export interface WerkwijzeStep {
  title: string
  description: string
  icon: LucideIcon
}

export const werkwijzeSteps: WerkwijzeStep[] = [
  {
    icon: ClipboardList,
    title: 'Inspectie en advies',
    description:
      'We komen langs op een moment dat u uitkomt, bekijken de situatie en geven helder advies over de beste oplossing.',
  },
  {
    icon: FileText,
    title: 'Heldere offerte',
    description:
      'U ontvangt een duidelijke offerte met vaste afspraken. Geen verrassingen achteraf.',
  },
  {
    icon: CalendarClock,
    title: 'Installatie op uw moment',
    description:
      'We plannen het werk op een tijdstip dat u past. Bereikbaar ma-zo 08:00-22:00, ook buiten kantooruren.',
  },
  {
    icon: CircleCheckBig,
    title: 'Netjes opgeleverd',
    description:
      'We testen de installatie, geven duidelijke uitleg en leveren alles netjes op. Ook na oplevering blijven we bereikbaar voor vragen.',
  },
]
