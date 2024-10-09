import React from 'react';
import DashboardView from './dashboardView';
import { Outlet } from 'react-router-dom';

function DashboardLayout() {
    return (
        <div className='dashboard-layout flex bg-[#d9d9fb] min-h-screen '>
            {/* Sidebar */}

           
            {/* Main content */}
            <div className="flex-grow flex flex-col bg-[#d9d9fb] h-auto overflow-y-auto">
                <DashboardView/>
                <Outlet />
            </div>
        </div>
    );
}

export default DashboardLayout;
