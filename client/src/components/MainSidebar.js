import * as React from 'react'
import { MainSidebarItem } from "./MainSidebarItem" 


 export const MainSidebar = () =>(
    <div className="sidebar">
        <div className="list-section">
            <MainSidebarItem
                text="Dashboard"
                id='dashboard'
                href='/'
            />
        </div>
        <div className="list-section">
            <MainSidebarItem
                text="Campaigns"
                id='campaigns'
                href='/campaigns'
            />
            <MainSidebarItem
                text="Flows"
                id='flows'
                href='/flow'
                />
            <MainSidebarItem
                text="Email Templates"     
                id='emailtemplate'
                href='/email-templates'
            />
        </div>
        <div className="list-section">
            <MainSidebarItem
                text="Lists & Segments"
                id='listsegments'
                href='/lists-campaigns'
            />
            <MainSidebarItem
                text="Profiles"
                id='profiles'
                href='/'
            />
            <MainSidebarItem
                text="Metrics"
                id='metrics'
                href='/'
            />    
            </div>
        <div className="list-section">    
            <MainSidebarItem
                text="Integrations"
                id='integrations'
                href='/'
            />
            <MainSidebarItem
                text="Data Feed"
                id='datafeed'
                href='/'
            />
        </div>
        <div className="list-section">
            <MainSidebarItem
                text="Signup Forms"
                id='signupforms'
                href='/'
            />
            <MainSidebarItem
                text="Preference pages"
                id='prefpages'
                href='/'
            />
        </div>
        <div className="list-section">
            <MainSidebarItem
                text="Image Library"
                id='imagelibrary'
                href='/'
            />
            <MainSidebarItem
                text="Tags"
                id='tags'
                href='/'
            />
        </div>
    </div>
)