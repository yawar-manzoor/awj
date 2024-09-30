import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import { Toaster } from 'react-hot-toast'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routesList } from './routes/Router.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
// MSAL
import { PublicClientApplication, EventType } from '@azure/msal-browser'
import { MsalProvider } from '@azure/msal-react'
import { msalConfig } from '../authConfig.js'
import { LoginContextProvider } from './contexts/LoginContext'

const msalInstance = new PublicClientApplication(msalConfig)

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            refetchOnWindowFocus: false,
        },
    },
})
msalInstance.addEventCallback((event) => {
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
        const account = event.payload.account
        msalInstance.setActiveAccount(account)
    }
    console.log(msalInstance.getAllAccounts(), 'getting accounts')
    console.log(event, 'sign in event triggered')
})
const router = createBrowserRouter(routesList)

createRoot(document.getElementById('root')).render(
    <LoginContextProvider>
        <MsalProvider instance={msalInstance}>
            <QueryClientProvider client={queryClient}>
                <Provider store={store}>
                    <Toaster position="top-right" />
                    <RouterProvider router={router} />
                </Provider>
            </QueryClientProvider>
        </MsalProvider>
    </LoginContextProvider>
)
