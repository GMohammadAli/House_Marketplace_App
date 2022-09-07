import {useState, useEffect} from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import {useNavigate} from "react-router-dom"
import Spinner from "../components/Spinner"

function CreateListing() {
    // const [geoLocationEnabled, setGeoLocationEnabled] = useState(true)
    const [loading, setLoading] = useState(true)
    const [formData, setFormData] = useState({
        //default values
        type: 'rent',
        name: '',
        bedrooms: 1,
        bathrooms: 1,
        parking: false,
        furished: false,
        adddress: '',
        offers: false,
        regularPrice: 0,
        discountedPrice: 0,
        images: {},
        latitude: 0,
        longitude: 0
    })

    const auth = getAuth()
    const navigate = useNavigate()
    
    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if(user) {
            setFormData({...formData, userRef: user.uid})
        } else {
            navigate('/sign-in')
        }
      })  
    })

    if(loading) {
        return <Spinner />
    }

  return (
    <div>
      
    </div>
  )
}

export default CreateListing
