import Approved from '../assets/ApprovedLandBank.svg'
import Partial from '../assets/PartialIcon.svg'
import HandedOver from '../assets/Handedover.svg'
import Completed from '../assets/completed.svg'
export const getIcon = (value) => {
    switch (value) {
        case 'Approved':
            return Approved
        case 'Completed':
            return Completed
        case 'Handed Over':
            return HandedOver
        case 'Partial Handed Over':
            return Partial
        default:
            return Approved
    }
}
