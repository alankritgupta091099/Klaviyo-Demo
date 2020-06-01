import * as React from 'react'
import styled from 'styled-components'
import { REACT_FLOW_CHART } from '@mrblenny/react-flow-chart'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt, faEnvelope , faUser , faClock , faCodeBranch } from '@fortawesome/free-solid-svg-icons'


const Outer = styled.div`
  background: #FFF;
  width: 279px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  margin: 8px 0 0 0;
  box-sizing: border-box;
  border: 1px solid #BAC2CA;
  border-radius: 4px;
  color: #606A72;
  transition: background-color .25s ease-out,color .25s ease-out;
  text-align: center;
  cursor:pointer;
  &:hover{
        box-shadow: 0 2px 2px rgba(98,111,126,.35);
  }
`

export const SidebarItem = ({ type, ports , properties , bg}) => {
  var icon=faBolt;
    if(type==='Email')
        icon=faEnvelope
    else if(type==='Update Profile Property')
        icon=faUser
    else if(type==='Time Delay')
        icon=faClock 
    else if(type==='Conditional split'|| type==='Trigger Split')
        icon=faCodeBranch
  return (
    <Outer
      style={{background: bg}}
      draggable={true}
      onDragStart={ (event) => {
        event.dataTransfer.setData(REACT_FLOW_CHART, JSON.stringify({ type, ports , properties }))
      } }
    >
    <div className="placed-component-icon-container">
        <div className="placed-component-icon-background" >
            <FontAwesomeIcon icon={icon} className="icon"/>
        </div>
    </div>
    <div className="placed-component-body">
        {type}
    </div>
    </Outer>
  )
}