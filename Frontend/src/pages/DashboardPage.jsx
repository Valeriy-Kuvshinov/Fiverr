import {
    Chart as ChartJS, ArcElement, LinearScale, BarElement, CategoryScale
    , LineController, LineElement, PointElement, Tooltip, Legend, Filler
} from 'chart.js'
ChartJS.register(ArcElement, CategoryScale, LineController, LinearScale
    , LineElement, PointElement, BarElement, Tooltip, Legend, Filler)

import { useState } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'

import { FinanceDashboard } from '../cmps/FinanceDashboard.jsx'
import { UserDashboard } from '../cmps/UserDashboard.jsx'
import { GigDashboard } from '../cmps/GigDashboard.jsx'

export function DashboardPage() {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <main className="dashboard-page flex column">
            <div className='dashboard-container-header flex column'>
                <h1>Welcome dear admin!</h1>
                <h2>Here is our most updated business statistics:</h2>
            </div>

            <Box sx={{ width: '100%', typography: 'body1' }}>
                <Tabs value={value} onChange={handleChange} aria-label="dashboard tabs" centered>
                    <Tab label="Gig Dashboard" />
                    <Tab label="User Dashboard" />
                    <Tab label="Finance Dashboard" />
                </Tabs>
                <Box p={3}>
                    {value === 0 && <GigDashboard />}
                    {value === 1 && <UserDashboard />}
                    {value === 2 && <FinanceDashboard />}
                </Box>
            </Box>
        </main>
    );
}