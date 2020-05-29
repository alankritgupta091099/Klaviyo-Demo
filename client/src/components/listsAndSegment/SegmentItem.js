import React, { Component } from 'react'
import { Row, Col , Button , Dropdown, DropdownToggle, DropdownMenu, DropdownItem , Label , Input } from 'reactstrap';
import { v4 as uuidv4 } from 'uuid';

import { SegmentConditions } from './List&SegmentData.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons'

const style={
    color:'#373F51', 
    border: '1px solid #dfe3e6' , 
    borderRadius:'0' , 
    height: '40px' , 
    display: 'inline-table', 
    boxSizing: 'border-box'
}

export class SegmentItem extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            modalCondition:false,
            modal1:false,
            modal2:false,
            modal3:false,
            ddVal:""
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle(){
        this.setState({
            modalCondition: !this.state.modalCondition
        })
    }

    changeValue(obj){
        if(obj!==this.state.ddVal) {
            this.props.clearOrObject(this.props.OR_id);
            this.setState({
                metricVal:null,
                freqVal:null,
                timeVal:null,
                dimensionVal:null,
                dim:null,
                conditionVal:null,
                typeVal:null,
                locationVal:null,
                regionVal:null,
                personVal:null,
                dimensionVal2:null,
                countryVal:null,
                within:null,
                of:null,
                listVal:null,
                attributeVal:null,
                possibilityVal:null
            });
        }
        this.setState({ddVal:obj});
        this.props.saveVal(null,null,null,this.props.OR_id,obj.id)
    }

    componentDidMount(){
        if(this.props.dd_id && Object.keys(this.props.item).length>1){
            var obj = SegmentConditions.find(element=>{
                return element.id==this.props.dd_id
            })
            if(this.props.dd_id==1){
                    this.setState({
                    ddVal:{
                        id:1,
                        text:obj.text                        
                    },                
                    metricVal:this.props.item.metric.val,
                    freqVal:this.props.item.frequency.val,
                    timeVal:this.props.item.time.val
                })
            } else if(this.props.dd_id==2){
                this.setState({
                    ddVal:{
                        id:2,
                        text:obj.text                        
                    },                
                    dimensionVal:this.props.item.dimensions.val,
                    conditionVal:this.props.item.condition.val,
                    typeVal:this.props.item.type.val
                })
            } else if(this.props.dd_id==3){
                this.setState({
                    ddVal:{
                        id:3,
                        text:obj.text                        
                    },                
                    locationVal:this.props.item.location.val,
                    regionVal:this.props.item.region.val
                })
            } else if(this.props.dd_id==4){
                this.setState({
                    ddVal:{
                        id:4,
                        text:obj.text                        
                    },                
                    personVal:this.props.item.person.val,
                    dimensionVal2:this.props.item.dimensions.val,
                    countryVal:this.props.item.countries.val
                })
            } else if(this.props.dd_id==5){
                this.setState({
                    ddVal:{
                        id:5,
                        text:obj.text                        
                    },                
                    personVal:this.props.item.person.val,
                    listVal:this.props.item.lists.val
                })
            } else if(this.props.dd_id==6){
                this.setState({
                    ddVal:{
                        id:6,
                        text:obj.text                        
                    },                
                    personVal:this.props.item.person.val
                })
            } else if(this.props.dd_id==7){
                this.setState({
                    ddVal:{
                        id:7,
                        text:obj.text                        
                    },                
                    attributeVal:this.props.item.attribute.val,
                    personVal:this.props.item.person.val,
                    possibilityVal:this.props.item.possibility.val,
                })
            }
        }
    }

    render() {
        return (
            <div id="segments-del" key={this.props.OR_id}>
            <Row>            
                <Col>                
                    <Dropdown  isOpen={this.state.modalCondition} toggle={this.toggle}>
                        <div class="seg-selector">
                        <DropdownToggle color="light" style={{...style, width:'600px'}} caret block>
                            {
                                (this.state.ddVal) ? this.state.ddVal.text : "Select A Condition"
                            }
                        </DropdownToggle>
                        </div>
                        <DropdownMenu>
                            {
                                SegmentConditions.map( ( condition , index ) => { 
                                    return(
                                        <>  
                                            <DropdownItem key={index} value={condition} onClick={this.changeValue.bind(this,condition)} style={{ height: '40px' , width:'600px', borderTop:'1px solid #ebeeef'}}>{condition.text}</DropdownItem>
                                        </>
                                    )
                                })
                            }                        
                        </DropdownMenu>
                    </Dropdown>
                </Col>
                <div class="del-icon">
                <Col>                
                    <Button color="light" style={{...style, width:'50px'}} onClick={()=>{
                        this.setState({ddVal:""})
                        this.props.removeVal(this.props.OR_id)
                    }}><FontAwesomeIcon icon={faTrash} /></Button>                   
                </Col>
                </div>
            </Row>
                     
            {
                (()=>{
                    if(this.state.ddVal.id===1){
                        return(                            
                            <Row>                                
                                <Col><span class="segment-text"><Label><strong>Has</strong></Label></span></Col>                                
                                <Col>
                                    <Dropdown isOpen={this.state.modal1} toggle={()=>this.setState({modal1:!this.state.modal1})}>
                                        <DropdownToggle color="light" style={{...style,width:'14rem'}} caret>
                                            {
                                                (this.state.metricVal) ? this.state.metricVal : "Choose Metric"
                                            }
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            {
                                                SegmentConditions[0].metric.map( ( metric , index ) => { 
                                                    return(
                                                        <>  
                                                            <DropdownItem divider />
                                                            <DropdownItem key={index} onClick={()=>{
                                                                this.setState({metricVal:metric})
                                                                this.props.saveVal(Object.keys(SegmentConditions[0])[2],index,metric,this.props.OR_id,this.state.ddVal.id)
                                                            }}>{metric}</DropdownItem>
                                                        </>
                                                    )
                                                })
                                            }                        
                                        </DropdownMenu>
                                    </Dropdown>
                                </Col>
                                <Col>
                                    <Dropdown isOpen={this.state.modal2} toggle={()=>this.setState({modal2:!this.state.modal2})}>
                                        <DropdownToggle color="light" style={{...style,width:'14rem'}} caret block>
                                            {
                                                (this.state.freqVal) ? this.state.freqVal : "Choose Frequency"
                                            }
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            {
                                                SegmentConditions[0].frequency.map( ( freq , index ) => { 
                                                    return(
                                                        <>  
                                                            <DropdownItem divider />
                                                            <DropdownItem key={index} onClick={()=>{
                                                                this.setState({freqVal:freq})
                                                                this.props.saveVal(Object.keys(SegmentConditions[0])[3],index,freq,this.props.OR_id,this.state.ddVal.id)
                                                            }}>{freq}</DropdownItem>
                                                        </>
                                                    )
                                                })
                                            }                        
                                        </DropdownMenu>
                                    </Dropdown>
                                </Col>
                                <Col>
                                    <Dropdown isOpen={this.state.modal3} toggle={()=>this.setState({modal3:!this.state.modal3})}>
                                        <DropdownToggle color="light" style={{...style,width:'14rem'}} caret>
                                            {
                                                (this.state.timeVal) ? this.state.timeVal : "Choose Time"
                                            }
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            {
                                                SegmentConditions[0].time.map( ( time , index ) => { 
                                                    return(
                                                        <>  
                                                            <DropdownItem divider />
                                                            <DropdownItem key={index} onClick={()=>{
                                                                this.setState({timeVal:time})
                                                                this.props.saveVal(Object.keys(SegmentConditions[0])[4],index,time,this.props.OR_id,this.state.ddVal.id)
                                                            }}>{time}</DropdownItem>
                                                        </>
                                                    )
                                                })
                                            }                        
                                        </DropdownMenu>
                                    </Dropdown>
                                </Col>
                                <Col>
                                <Button color = "light" style={{...style, width:'50px'}} onClick={this.props.addOrComponent}>OR</Button></Col>
                            </Row>
                            
                           
                        )
                    } else if(this.state.ddVal.id===2){
                        return(
                            <Row>
                                <Col>
                                    <Dropdown isOpen={this.state.modal1} toggle={()=>this.setState({modal1:!this.state.modal1})}>
                                        <DropdownToggle color="light" style={{...style,width:'10rem'}} caret>
                                            {
                                                (this.state.dimensionVal) ? this.state.dimensionVal : "Dimensions"
                                            }
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            {
                                                SegmentConditions[1].dimensions.map( ( dimension , index ) => { 
                                                    return(
                                                        <>  
                                                            <DropdownItem divider />
                                                            <DropdownItem key={index} onClick={()=>{
                                                                this.setState({dimensionVal:dimension})
                                                                this.props.saveVal(Object.keys(SegmentConditions[1])[2],index,dimension,this.props.OR_id,this.state.ddVal.id)
                                                            }}>{dimension}</DropdownItem>
                                                        </>
                                                    )
                                                })
                                            }                        
                                        </DropdownMenu>
                                    </Dropdown>
                                </Col>
                                <Col>
                                    <Dropdown isOpen={this.state.modal2} toggle={()=>this.setState({modal2:!this.state.modal2})}>
                                        <DropdownToggle color="light" style={{...style,width:'10.5rem'}} caret>
                                            {
                                                (this.state.conditionVal) ? this.state.conditionVal : "Choose Condition"
                                            }
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            {
                                                SegmentConditions[1].condition.map( ( condition , index ) => { 
                                                    return(
                                                        <>  
                                                            <DropdownItem divider />
                                                            <DropdownItem key={index} onClick={()=>{
                                                                this.setState({conditionVal:condition})
                                                                this.props.saveVal(Object.keys(SegmentConditions[1])[3],index,condition,this.props.OR_id,this.state.ddVal.id)
                                                            }}>{condition}</DropdownItem>
                                                        </>
                                                    )
                                                })
                                            }                        
                                        </DropdownMenu>
                                    </Dropdown>
                                </Col>
                                <Col>
                                    <span class="segment-text"><Label><strong>Type:</strong></Label></span>
                                </Col>
                                <Col>
                                    <Input type="text" style={{...style, width:'170px', marginLeft:'-10px'}} value={this.state.dim} onChange={()=>{
                                        this.setState({dim:this.state.dim})
                                        // this.props.saveVal("DimensionValue",null,this.state.dim,this.props.OR_id,this.state.ddVal.id) =====>>shows value undefined
                                    }} placeholder="Dimension Value" />
                                </Col>
                                <Col>
                                    <Dropdown isOpen={this.state.modal3} toggle={()=>this.setState({modal3:!this.state.modal3})}>
                                        <DropdownToggle color="light" style={{...style,width:'9.5rem'}} caret>
                                            {
                                                (this.state.typeVal) ? this.state.typeVal : "Choose Type"
                                            }
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            {
                                                SegmentConditions[1].type.map( ( type , index ) => { 
                                                    return(
                                                        <>  
                                                            <DropdownItem divider />
                                                            <DropdownItem key={index} onClick={()=>{
                                                                this.setState({typeVal:type})
                                                                this.props.saveVal(Object.keys(SegmentConditions[1])[4],index,type,this.props.OR_id,this.state.ddVal.id)
                                                            }}>{type}</DropdownItem>
                                                        </>
                                                    )
                                                })
                                            }                        
                                        </DropdownMenu>
                                    </Dropdown>
                                </Col>
                                <Button color="light" style={{...style, width:'50px'}} onClick={this.props.addOrComponent}>OR</Button>
                            </Row>
                        )
                    } else if(this.state.ddVal.id===3){
                        return(
                            <Row>
                                <Col>
                                    <span class="segment-text"><Label><strong>Location</strong></Label></span>
                                </Col>
                                <Col>
                                    <Dropdown isOpen={this.state.modal1} toggle={()=>this.setState({modal1:!this.state.modal1})}>
                                        <DropdownToggle color="light"  style={{...style,width:'6rem', marginLeft:'-50px'}} caret>
                                            {
                                                (this.state.locationVal) ? this.state.locationVal : "Select"
                                            }
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            {
                                                SegmentConditions[2].location.map( ( location , index ) => { 
                                                    return(
                                                        <>  
                                                            <DropdownItem divider />
                                                            <DropdownItem key={index} onClick={()=>{
                                                                this.setState({locationVal:location})
                                                                this.props.saveVal(Object.keys(SegmentConditions[2])[2],index,location,this.props.OR_id,this.state.ddVal.id)
                                                            }}>{location}</DropdownItem>
                                                        </>
                                                    )
                                                })
                                            }                        
                                        </DropdownMenu>
                                    </Dropdown>
                                </Col>
                                <Col>
                                    <span class="segment-text" style={{marginLeft:'-50px'}}><Label><strong>Within</strong></Label></span>
                                </Col>
                                <Col>
                                    <Dropdown isOpen={this.state.modal2} toggle={()=>this.setState({modal2:!this.state.modal2})}>
                                        <DropdownToggle color="light" style={{...style,width:'10rem',marginLeft:'-100px'}} caret>
                                            {
                                                (this.state.regionVal) ? this.state.regionVal : "Choose region.."
                                            }
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            {
                                                SegmentConditions[2].region.map( ( region , index ) => { 
                                                    return(
                                                        <>  
                                                            <DropdownItem divider />
                                                            <DropdownItem key={index} onClick={()=>{
                                                                this.setState({regionVal:region})
                                                                this.props.saveVal(Object.keys(SegmentConditions[2])[3],index,region,this.props.OR_id,this.state.ddVal.id)
                                                            }}>{region}</DropdownItem>
                                                        </>
                                                    )
                                                })
                                            }                        
                                        </DropdownMenu>
                                    </Dropdown>
                                </Col>                                
                                <Button color="light" style={{...style,width:'50px'}} onClick={this.props.addOrComponent}>OR</Button>
                            </Row>
                        )
                    } else if(this.state.ddVal.id===4){
                        return(
                            <Row>
                                <span class="segment-text" style={{marginLeft:'20px'}}><Label><strong>Person</strong></Label></span>
                                <Col>
                                    <Dropdown isOpen={this.state.modal1} toggle={()=>this.setState({modal1:!this.state.modal1})}>
                                        <DropdownToggle color="light" style={{...style,width:'6rem'}} caret>
                                            {
                                                (this.state.personVal) ? this.state.personVal :"Select"
                                            }
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            {
                                                SegmentConditions[3].person.map( ( person , index ) => { 
                                                    return(
                                                        <>  
                                                            <DropdownItem divider />
                                                            <DropdownItem key={index} onClick={()=>{
                                                                this.setState({personVal:person})
                                                                this.props.saveVal(Object.keys(SegmentConditions[3])[2],index,person,this.props.OR_id,this.state.ddVal.id)
                                                            }}>{person}</DropdownItem>
                                                        </>
                                                    )
                                                })
                                            }                        
                                        </DropdownMenu>
                                    </Dropdown>
                                </Col>
                                <span class="segment-text"><Label><strong>Within</strong></Label></span>
                                <Col>
                                    <Input type="text" value={this.state.within} style={{...style,width:'3rem'}} onChange={()=>this.setState({within:this.state.within})} />
                                </Col>
                                <Col>
                                    <Dropdown isOpen={this.state.modal3} toggle={()=>this.setState({modal3:!this.state.modal3})}>
                                        <DropdownToggle color="light" style={{...style,width:'12rem'}} caret>
                                            {
                                                (this.state.dimensionVal2) ? this.state.dimensionVal2 : "Choose Dimensions"
                                            }
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            {
                                                SegmentConditions[3].dimensions.map( ( dimension , index ) => { 
                                                    return(
                                                        <>  
                                                            <DropdownItem divider />
                                                            <DropdownItem key={index} onClick={()=>{
                                                                this.setState({dimensionVal2:dimension})
                                                                this.props.saveVal(Object.keys(SegmentConditions[3])[3],index,dimension,this.props.OR_id,this.state.ddVal.id)
                                                            }}>{dimension}</DropdownItem>
                                                        </>
                                                    )
                                                })
                                            }                        
                                        </DropdownMenu>
                                    </Dropdown>
                                </Col>
                                <span class="segment-text"><Label><strong>of</strong></Label></span>
                                <Col>
                                    <Input type="text" value={this.state.of} style={{...style,width:'9.5rem'}} onChange={()=>this.setState({of:this.state.of})} placeholder="Postal/Zip Code"/>
                                </Col>
                                <span class="segment-text"><Label><strong>in</strong></Label></span>
                                <Col>
                                    <Dropdown isOpen={this.state.modal2} toggle={()=>this.setState({modal2:!this.state.modal2})}>
                                        <DropdownToggle color="light" style={{...style,width:'10rem'}} caret>
                                            {
                                                (this.state.countryVal) ? this.state.countryVal : "Choose country"
                                            }
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            {
                                                SegmentConditions[3].countries.map( ( country , index ) => { 
                                                    return(
                                                        <>  
                                                            <DropdownItem divider />
                                                            <DropdownItem key={index} onClick={()=>{
                                                                this.setState({countryVal:country})
                                                                this.props.saveVal(Object.keys(SegmentConditions[3])[4],index,country,this.props.OR_id,this.state.ddVal.id)
                                                            }}>{country}</DropdownItem>
                                                        </>
                                                    )
                                                })
                                            }                        
                                        </DropdownMenu>
                                    </Dropdown>
                                </Col>                                
                                <Button color="light" style={{...style,width:'50px'}} onClick={this.props.addOrComponent}>OR</Button>
                            </Row>
                        )
                    } else if(this.state.ddVal.id===5){
                        return(
                            <Row>
                                <span class="segment-text" style={{paddingLeft:'15px'}}><Label><strong>Person</strong></Label></span>
                                <Col>
                                    <Dropdown isOpen={this.state.modal1} toggle={()=>this.setState({modal1:!this.state.modal1})}>
                                        <DropdownToggle color="light" style={{...style,width:'6rem'}} caret>
                                            {
                                                (this.state.personVal) ? this.state.personVal : "Select"
                                            }
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            {
                                                SegmentConditions[4].person.map( ( person , index ) => { 
                                                    return(
                                                        <>  
                                                            <DropdownItem divider />
                                                            <DropdownItem key={index} onClick={()=>{
                                                                this.setState({personVal:person})
                                                                this.props.saveVal(Object.keys(SegmentConditions[4])[2],index,person,this.props.OR_id,this.state.ddVal.id)
                                                            }}>{person}</DropdownItem>
                                                        </>
                                                    )
                                                })
                                            }                        
                                        </DropdownMenu>
                                    </Dropdown>
                                </Col>
                                <span class="segment-text"><Label><strong>in</strong></Label></span>
                                <Col>
                                    <Dropdown isOpen={this.state.modal2} toggle={()=>this.setState({modal2:!this.state.modal2})}>
                                        <DropdownToggle color="light" style={{...style,width:'10rem'}} caret>
                                            {
                                                (this.state.listVal) ? this.state.listVal : "Choose a list.."
                                            }
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            {
                                                SegmentConditions[4].lists.map( ( list , index ) => { 
                                                    return(
                                                        <>  
                                                            <DropdownItem divider />
                                                            <DropdownItem key={index} onClick={()=>{
                                                                this.setState({listVal:list})
                                                                this.props.saveVal(Object.keys(SegmentConditions[4])[3],index,list,this.props.OR_id,this.state.ddVal.id)
                                                            }}>{list}</DropdownItem>
                                                        </>
                                                    )
                                                })
                                            }                        
                                        </DropdownMenu>
                                    </Dropdown>
                                </Col>                                
                                <Button color="light" onClick={this.props.addOrComponent}>OR</Button>
                            </Row>
                        )
                    } else if(this.state.ddVal.id===6){
                        return(
                            <Row>
                            <span class="segment-text" style={{marginLeft:'20px'}}><Label><strong>Person</strong></Label></span>
                                <Col>
                                <div class="condition-6">
                                    <Dropdown isOpen={this.state.modal1} toggle={()=>this.setState({modal1:!this.state.modal1})}>
                                        <DropdownToggle color="light" style={{...style,width:'10rem'}} caret>
                                            {
                                                (this.state.personVal) ? this.state.personVal : "Select"
                                            }
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            {
                                                SegmentConditions[5].person.map( ( person , index ) => { 
                                                    return(
                                                        <>  
                                                            <DropdownItem divider />
                                                            <DropdownItem key={index} onClick={()=>{
                                                                this.setState({personVal:person})
                                                                this.props.saveVal(Object.keys(SegmentConditions[5])[2],index,person,this.props.OR_id,this.state.ddVal.id)
                                                            }}>{person}</DropdownItem>
                                                        </>
                                                    )
                                                })
                                            }                        
                                        </DropdownMenu>
                                    </Dropdown>
                                    </div>
                                </Col>
                                <Col>
                                    <div class="suppressed-text"><Label><strong>suppressed</strong></Label></div>
                                </Col>
                                <Button color="light" style={{...style,width:'50px'}} onClick={this.props.addOrComponent}>OR</Button>
                            </Row>
                        )
                    } else if(this.state.ddVal.id===7){
                        return(
                            <Row>
                                <span class="segment-text" style={{marginLeft:'20px'}}><Label><strong>Person</strong></Label></span>
                                <Col>
                                    <Dropdown isOpen={this.state.modal1} toggle={()=>this.setState({modal1:!this.state.modal1})}>
                                        <DropdownToggle color="light" style={{...style,width:'10rem'}} caret>
                                            {
                                                (this.state.attributeVal) ? this.state.attributeVal : "Choose Attribute"
                                            }
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            {
                                                SegmentConditions[6].attribute.map( ( attribute , index ) => { 
                                                    return(
                                                        <>  
                                                            <DropdownItem divider />
                                                            <DropdownItem key={index} onClick={()=>{
                                                                this.setState({attributeVal:attribute})
                                                                this.props.saveVal(Object.keys(SegmentConditions[6])[2],index,attribute,this.props.OR_id,this.state.ddVal.id)
                                                            }}>{attribute}</DropdownItem>
                                                        </>
                                                    )
                                                })
                                            }                        
                                        </DropdownMenu>
                                    </Dropdown>
                                </Col>
                                <Col>
                                    <Dropdown isOpen={this.state.modal2} toggle={()=>this.setState({modal2:!this.state.modal2})}>
                                        <DropdownToggle color="light" style={{...style,width:'10rem'}} caret>
                                            {
                                                (this.state.personVal) ? this.state.personVal : "Select"
                                            }
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            {
                                                SegmentConditions[6].person.map( ( person , index ) => { 
                                                    return(
                                                        <>  
                                                            <DropdownItem divider />
                                                            <DropdownItem key={index} onClick={()=>{
                                                                this.setState({personVal:person})
                                                                this.props.saveVal(Object.keys(SegmentConditions[6])[3],index,person,this.props.OR_id,this.state.ddVal.id)
                                                            }}>{person}</DropdownItem>
                                                        </>
                                                    )
                                                })
                                            }                        
                                        </DropdownMenu>
                                    </Dropdown>
                                </Col>
                                <Col>
                                    <Dropdown isOpen={this.state.modal3} toggle={()=>this.setState({modal3:!this.state.modal3})}>
                                        <DropdownToggle color="light" style={{...style,width:'10rem'}} caret>
                                            {
                                                (this.state.possibilityVal) ? this.state.possibilityVal : "Select Option"
                                            }
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            {
                                                SegmentConditions[6].possibility.map( ( possibility , index ) => { 
                                                    return(
                                                        <>  
                                                            <DropdownItem divider />
                                                            <DropdownItem key={index} onClick={()=>{
                                                                this.setState({possibilityVal:possibility})
                                                                this.props.saveVal(Object.keys(SegmentConditions[6])[4],index,possibility,this.props.OR_id,this.state.ddVal.id)
                                                            }}>{possibility}</DropdownItem>
                                                        </>
                                                    )
                                                })
                                            }                        
                                        </DropdownMenu>
                                    </Dropdown>
                                </Col>                         
                                <Button color="light" style={{...style,width:'50px'}} onClick={this.props.addOrComponent}>OR</Button>
                            </Row>
                        )
                    }
                })()
            }
            </div>
        )
    }
}

export class SegmentItemOR extends Component{

    constructor(props) {
        super(props)
    
        this.state = {
            arr:[]
        }
        
    }

    addOrComponent=()=>{
        this.state.arr.push({OR_id:uuidv4()})
        this.setState({
            arr:this.state.arr
        })
        //console.log(this.state.arr)
    }

    saveVal = (type,index,val,OR_id,dd_id) => {
        this.state.arr.forEach(element => {
            if(element.OR_id===OR_id && type==null){
                element.dd_id=dd_id
            }else if(element.OR_id===OR_id && type != null){
                element[type]={
                    index,
                    val
                }
            }
        });
        this.props.saveAndComponent(this.state.arr,this.props.item.AND_id);
        //console.log(this.state.arr)
    }

    removeVal = (OR_id) => {
        if ( this.state.arr.length > 1 ){
            var newArr=[]
            this.state.arr.forEach(element => {
                if(element.OR_id!=OR_id){
                    newArr.push(element)
                }
            });
            console.log(newArr)
            this.setState({arr:newArr})
            //Deleting correct value but not rendering
        }
    }

    clearOrObject = (obj) => {
        for (let index = 0; index < this.state.arr.length; index++) {
            if(this.state.arr[index].OR_id==obj){
                this.state.arr[index]={
                    OR_id:obj
                }
            }            
        }
    }

    componentDidMount(){
        if(Object.keys(this.props.item).length>1){
            this.setState({
                arr:this.props.item.orArr
            })
        }
    }

    render(){    
        if(this.state.arr.length==0){
            this.setState({
                arr:[{OR_id:uuidv4()}]
            })
        }    
        return(
            <>
                {
                    this.state.arr.map( (item , index) => {
                        return <div className="ORcard">
                            <SegmentItem OR_id={item.OR_id} dd_id={item.dd_id} item={item} addOrComponent={this.addOrComponent} saveVal={this.saveVal} removeVal={this.removeVal} clearOrObject={this.clearOrObject} />
                            {
                                (this.state.arr[this.state.arr.length-1].OR_id!=item.OR_id)?<p style={{marginTop:'45px', color:'rgba(98, 111, 126, 0.66)'}}>OR  ----------------------------------------------------------------------------------------------------------------------------------------------</p>:""
                            }
                        </div>
                    })
                }
            </>
        )
    }
}