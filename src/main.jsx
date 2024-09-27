import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import { Toaster } from 'react-hot-toast'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routesList } from './routes/Router.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            refetchOnWindowFocus: false,
        },
    },
})
const router = createBrowserRouter(routesList)

createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
        <Provider store={store}>
            <Toaster position="top-right" />
            <RouterProvider router={router} />
        </Provider>
    </QueryClientProvider>
)
