import { collection, doc, onSnapshot, setDoc } from 'firebase/firestore'
import { useEffect, useState, useRef } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import debounce from 'lodash.debounce'

import { auth, firestore } from '~/firebase'

export function useUserData() {
    const [user] = useAuthState(auth)
    const [displayName, setDisplayName] = useState('')
    const [photoURL, setPhotoUrl] = useState('')

    useEffect(() => {

        let unsubscribe

        if(user) {
            const usersRef = collection(firestore, 'users')
            const userDoc = doc(usersRef, user.uid)

            unsubscribe = onSnapshot(userDoc, (doc) => {
                const userDocData = doc.data()

                if(userDocData) {
                    setDisplayName(userDocData.displayName)
                    setPhotoUrl(userDocData.photoURL)
                }

                if(!userDocData) setDoc(userDoc, {
                    photoURL: user.photoURL,
                    displayName: user.displayName
                })
            })
        } else {
            setDisplayName('')
            setPhotoUrl('')
        }

        return unsubscribe
    }, [user])

    return { user, displayName, photoURL }
}

export function useFirstRender() {

    const firstRender = useRef(true)

    useEffect(() => {
        if(firstRender.current) firstRender.current = false
    }, [])

    return firstRender.current
}

export function usePrevious(value) {
    const ref = useRef()

    useEffect(() => {
        ref.current = value
    })

    return ref.current
}

export function useWindowWidth(delay = 500) {

    const [width, setWidth] = useState(window.innerWidth)

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth)

        const debouncedHandleResize = debounce(handleResize, delay)

        window.addEventListener('resize', debouncedHandleResize)

        return () => {
            window.removeEventListener('resize', debouncedHandleResize)
        }

    }, [delay])

    return width
}