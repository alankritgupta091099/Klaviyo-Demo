import React, { Component } from 'react'
import { Row, Col , Button , Dropdown, DropdownToggle, DropdownMenu, DropdownItem , Label , Input } from 'reactstrap';
import { v4 as uuidv4 } from 'uuid';

import { SegmentConditions } from './List&SegmentData.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons'

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
        this.setState({ddVal:obj})
    }

    render() {
        return (
            <div id="segments-del" key={this.props.OR_id}>
            
            <Row>
            
                <Col>
                
                    <Dropdown  size="sm" isOpen={this.state.modalCondition} toggle={this.toggle}>
                        <div class="seg-selector">
                        <DropdownToggle color="light" caret size="lg" block>
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
                                            <DropdownItem divider />
                                            <DropdownItem key={index} value={condition} onClick={this.changeValue.bind(this,condition)}>{condition.text}</DropdownItem>
                                        </>
                                    )
                                })
                            }                        
                        </DropdownMenu>
                    </Dropdown>
                </Col>
                <div class="del-icon">
                <Col>
                
                    <Button color="light" onClick={()=>{
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
                                
                                <span class="segment-text"><Label><strong>Has</strong></Label></span>
                                
                                <Col>
                                    <Dropdown isOpen={this.state.modal1} toggle={()=>this.setState({modal1:!this.state.modal1})}>
                                        <DropdownToggle color="light" caret>
                                            {
                                                (this.state.metricVal) ? this.state.metricVal : "Choose Metric"
                                            }
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            {
                                                this.state.ddVal.metric.map( ( metric , index ) => { 
                                                    return(
                                                        <>  
                                                            <DropdownItem divider />
                                                            <DropdownItem key={index} onClick={()=>{
                                                                this.setState({metricVal:metric})
                                                                this.props.saveVal(Object.keys(this.state.ddVal)[2],index,metric,this.props.OR_id,this.state.ddVal.id)
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
                                        <DropdownToggle color="light" caret block>
                                            {
                                                (this.state.freqVal) ? this.state.freqVal : "Choose Frequency"
                                            }
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            {
                                                this.state.ddVal.frequency.map( ( freq , index ) => { 
                                                    return(
                                                        <>  
                                                            <DropdownItem divider />
                                                            <DropdownItem key={index} onClick={()=>{
                                                                this.setState({freqVal:freq})
                                                                this.props.saveVal(Object.keys(this.state.ddVal)[3],index,freq,this.props.OR_id,this.state.ddVal.id)
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
                                        <DropdownToggle color="light" caret>
                                            {
                                                (this.state.timeVal) ? this.state.timeVal : "Choose Time"
                                            }
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            {
                                                this.state.ddVal.time.map( ( time , index ) => { 
                                                    return(
                                                        <>  
                                                            <DropdownItem divider />
                                                            <DropdownItem key={index} onClick={()=>{
                                                                this.setState({timeVal:time})
                                                                this.props.saveVal(Object.keys(this.state.ddVal)[4],index,time,this.props.OR_id,this.state.ddVal.id)
                                                            }}>{time}</DropdownItem>
                                                        </>
                                                    )
                                                })
                                            }                        
                                        </DropdownMenu>
                                    </Dropdown>
                                </Col>
                                <Button color = "light" onClick={this.props.addOrComponent}>OR</Button>
                            </Row>
                            
                           
                        )
                    } else if(this.state.ddVal.id===2){
                        return(
                            <Row>
                                <Col>
                                    <Dropdown isOpen={this.state.modal1} toggle={()=>this.setState({modal1:!this.state.modal1})}>
                                        <DropdownToggle color="light" caret>
                                            {
                                                (this.state.dimensionVal) ? this.state.dimensionVal : "Dimensions"
                                            }
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            {
                                                this.state.ddVal.dimensions.map( ( dimension , index ) => { 
                                                    return(
                                                        <>  
                                                            <DropdownItem divider />
                                                            <DropdownItem key={index} onClick={()=>{
                                                                this.setState({dimensionVal:dimension})
                                                                this.props.saveVal(Object.keys(this.state.ddVal)[2],index,dimension,this.props.OR_id,this.state.ddVal.id)
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
                                        <DropdownToggle color="light" caret>
                                            {
                                                (this.state.conditionVal) ? this.state.conditionVal : "Choose Condition"
                                            }
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            {
                                                this.state.ddVal.condition.map( ( condition , index ) => { 
                                                    return(
                                                        <>  
                                                            <DropdownItem divider />
                                                            <DropdownItem key={index} onClick={()=>{
                                                                this.setState({conditionVal:condition})
                                                                this.props.saveVal(Object.keys(this.state.ddVal)[3],index,condition,this.props.OR_id,this.state.ddVal.id)
                                                            }}>{condition}</DropdownItem>
                                                        </>
                                                    )
                                                })
                                            }                        
                                        </DropdownMenu>
                                    </Dropdown>
                                </Col>
                                <Col>
                                    <Input type="text" value={this.state.dim} onChange={()=>{
                                        this.setState({dim:this.state.dim})
                                        // this.props.saveVal("DimensionValue",null,this.state.dim,this.props.OR_id,this.state.ddVal.id) =====>>shows value undefined
                                    }} placeholder="Dimension Value" />
                                </Col>
                                <span class="segment-text"><Label><strong>Type:</strong></Label></span>
                                <Col>
                                    <Dropdown isOpen={this.state.modal3} toggle={()=>this.setState({modal3:!this.state.modal3})}>
                                        <DropdownToggle color="light" caret>
                                            {
                                                (this.state.typeVal) ? this.state.typeVal : "Choose Type"
                                            }
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            {
                                                this.state.ddVal.type.map( ( type , index ) => { 
                                                    return(
                                                        <>  
                                                            <DropdownItem divider />
                                                            <DropdownItem key={index} onClick={()=>{
                                                                this.setState({typeVal:type})
                                                                this.props.saveVal(Object.keys(this.state.ddVal)[4],index,type,this.props.OR_id,this.state.ddVal.id)
                                                            }}>{type}</DropdownItem>
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
                    } else if(this.state.ddVal.id===3){
                        return(
                            <Row>
                                <span class="segment-text"><Label><strong>Location</strong></Label></span>
                                <Col>
                                    <Dropdown isOpen={this.state.modal1} toggle={()=>this.setState({modal1:!this.state.modal1})}>
                                        <DropdownToggle color="light" caret>
                                            {
                                                (this.state.locationVal) ? this.state.locationVal : "Select"
                                            }
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            {
                                                this.state.ddVal.location.map( ( location , index ) => { 
                                                    return(
                                                        <>  
                                                            <DropdownItem divider />
                                                            <DropdownItem key={index} onClick={()=>{
                                                                this.setState({locationVal:location})
                                                                this.props.saveVal(Object.keys(this.state.ddVal)[2],index,location,this.props.OR_id,this.state.ddVal.id)
                                                            }}>{location}</DropdownItem>
                                                        </>
                                                    )
                                                })
                                            }                        
                                        </DropdownMenu>
                                    </Dropdown>
                                </Col>
                                <span class="segment-text"><Label><strong>Location</strong></Label></span>
                                <Col>
                                    <Dropdown isOpen={this.state.modal2} toggle={()=>this.setState({modal2:!this.state.modal2})}>
                                        <DropdownToggle color="light" caret>
                                            {
                                                (this.state.regionVal) ? this.state.regionVal : "Choose region.."
                                            }
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            {
                                                this.state.ddVal.region.map( ( region , index ) => { 
                                                    return(
                                                        <>  
                                                            <DropdownItem divider />
                                                            <DropdownItem key={index} onClick={()=>{
                                                                this.setState({regionVal:region})
                                                                this.props.saveVal(Object.keys(this.state.ddVal)[3],index,region,this.props.OR_id,this.state.ddVal.id)
                                                            }}>{region}</DropdownItem>
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
                    } else if(this.state.ddVal.id===4){
                        return(
                            <Row>
                            <span class="segment-text"><Label><strong>Person</strong></Label></span>
                                <Col>
                                    <Dropdown isOpen={this.state.modal1} toggle={()=>this.setState({modal1:!this.state.modal1})}>
                                        <DropdownToggle color="light" caret>
                                            {
                                                (this.state.personVal) ? this.state.personVal :"Select"
                                            }
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            {
                                                this.state.ddVal.person.map( ( person , index ) => { 
                                                    return(
                                                        <>  
                                                            <DropdownItem divider />
                                                            <DropdownItem key={index} onClick={()=>{
                                                                this.setState({personVal:person})
                                                                this.props.saveVal(Object.keys(this.state.ddVal)[2],index,person,this.props.OR_id,this.state.ddVal.id)
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
                                    <Input type="text" value={this.state.within} onChange={()=>this.setState({within:this.state.within})} />
                                </Col>
                                <Col>
                                    <Dropdown isOpen={this.state.modal3} toggle={()=>this.setState({modal3:!this.state.modal3})}>
                                        <DropdownToggle color="light" caret>
                                            {
                                                (this.state.dimensionVal2) ? this.state.dimensionVal2 : "Choose Dimensions"
                                            }
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            {
                                                this.state.ddVal.dimensions.map( ( dimension , index ) => { 
                                                    return(
                                                        <>  
                                                            <DropdownItem divider />
                                                            <DropdownItem key={index} onClick={()=>{
                                                                this.setState({dimensionVal2:dimension})
                                                                this.props.saveVal(Object.keys(this.state.ddVal)[3],index,dimension,this.props.OR_id,this.state.ddVal.id)
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
                                    <Input type="text" value={this.state.of} onChange={()=>this.setState({of:this.state.of})} placeholder="Postal/Zip Code"/>
                                </Col>
                                <span class="segment-text"><Label><strong>in</strong></Label></span>
                                <Col>
                                    <Dropdown isOpen={this.state.modal2} toggle={()=>this.setState({modal2:!this.state.modal2})}>
                                        <DropdownToggle color="light" caret>
                                            {
                                                (this.state.countryVal) ? this.state.countryVal : "Choose country"
                                            }
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            {
                                                this.state.ddVal.countries.map( ( country , index ) => { 
                                                    return(
                                                        <>  
                                                            <DropdownItem divider />
                                                            <DropdownItem key={index} onClick={()=>{
                                                                this.setState({countryVal:country})
                                                                this.props.saveVal(Object.keys(this.state.ddVal)[4],index,country,this.props.OR_id,this.state.ddVal.id)
                                                            }}>{country}</DropdownItem>
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
                    } else if(this.state.ddVal.id===5){
                        return(
                            <Row>
                            <span class="segment-text"><Label><strong>Person</strong></Label></span>
                                <Col>
                                    <Dropdown isOpen={this.state.modal1} toggle={()=>this.setState({modal1:!this.state.modal1})}>
                                        <DropdownToggle color="light" caret>
                                            {
                                                (this.state.personVal) ? this.state.personVal : "Select"
                                            }
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            {
                                                this.state.ddVal.person.map( ( person , index ) => { 
                                                    return(
                                                        <>  
                                                            <DropdownItem divider />
                                                            <DropdownItem key={index} onClick={()=>{
                                                                this.setState({personVal:person})
                                                                this.props.saveVal(Object.keys(this.state.ddVal)[2],index,person,this.props.OR_id,this.state.ddVal.id)
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
                                        <DropdownToggle color="light" caret>
                                            {
                                                (this.state.listVal) ? this.state.listVal : "Choose a list.."
                                            }
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            {
                                                this.state.ddVal.lists.map( ( list , index ) => { 
                                                    return(
                                                        <>  
                                                            <DropdownItem divider />
                                                            <DropdownItem key={index} onClick={()=>{
                                                                this.setState({listVal:list})
                                                                this.props.saveVal(Object.keys(this.state.ddVal)[3],index,list,this.props.OR_id,this.state.ddVal.id)
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
                            <span class="segment-text"><Label><strong>Person</strong></Label></span>
                                <Col>
                                <div class="condition-6">
                                    <Dropdown isOpen={this.state.modal1} toggle={()=>this.setState({modal1:!this.state.modal1})}>
                                        <DropdownToggle color="light" caret>
                                            {
                                                (this.state.personVal) ? this.state.personVal : "Select"
                                            }
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            {
                                                this.state.ddVal.person.map( ( person , index ) => { 
                                                    return(
                                                        <>  
                                                            <DropdownItem divider />
                                                            <DropdownItem key={index} onClick={()=>{
                                                                this.setState({personVal:person})
                                                                this.props.saveVal(Object.keys(this.state.ddVal)[2],index,person,this.props.OR_id,this.state.ddVal.id)
                                                            }}>{person}</DropdownItem>
                                                        </>
                                                    )
                                                })
                                            }                        
                                        </DropdownMenu>
                                    </Dropdown>
                                    </div>
                                </Col>
                                <div class="suppressed-text"><Label><strong>suppressed</strong></Label></div>                              
                                <Button color="light" onClick={this.props.addOrComponent}>OR</Button>
                            </Row>
                        )
                    } else if(this.state.ddVal.id===7){
                        return(
                            <Row>
                            <span class="segment-text"><Label><strong>Person</strong></Label></span>
                                <Col>
                                    <Dropdown isOpen={this.state.modal1} toggle={()=>this.setState({modal1:!this.state.modal1})}>
                                        <DropdownToggle color="light" caret>
                                            {
                                                (this.state.attributeVal) ? this.state.attributeVal : "Choose Attribute"
                                            }
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            {
                                                this.state.ddVal.attribute.map( ( attribute , index ) => { 
                                                    return(
                                                        <>  
                                                            <DropdownItem divider />
                                                            <DropdownItem key={index} onClick={()=>{
                                                                this.setState({attributeVal:attribute})
                                                                this.props.saveVal(Object.keys(this.state.ddVal)[2],index,attribute,this.props.OR_id,this.state.ddVal.id)
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
                                        <DropdownToggle color="light" caret>
                                            {
                                                (this.state.personVal) ? this.state.personVal : "Select"
                                            }
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            {
                                                this.state.ddVal.person.map( ( person , index ) => { 
                                                    return(
                                                        <>  
                                                            <DropdownItem divider />
                                                            <DropdownItem key={index} onClick={()=>{
                                                                this.setState({personVal:person})
                                                                this.props.saveVal(Object.keys(this.state.ddVal)[3],index,person,this.props.OR_id,this.state.ddVal.id)
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
                                        <DropdownToggle color="light" caret>
                                            {
                                                (this.state.possibilityVal) ? this.state.possibilityVal : this.state.ddVal.possibility[0]
                                            }
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            {
                                                this.state.ddVal.possibility.map( ( possibility , index ) => { 
                                                    return(
                                                        <>  
                                                            <DropdownItem divider />
                                                            <DropdownItem key={index} onClick={()=>{
                                                                this.setState({possibilityVal:possibility})
                                                                this.props.saveVal(Object.keys(this.state.ddVal)[4],index,possibility,this.props.OR_id,this.state.ddVal.id)
                                                            }}>{possibility}</DropdownItem>
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
            arr:[{OR_id:uuidv4()}]
        }
        
    }

    addOrComponent=()=>{
        this.state.arr.push({OR_id:uuidv4()})
        this.setState({
            arr:this.state.arr
        })
        console.log(this.state.arr)
    }

    saveVal = (type,index,val,OR_id,dd_id) => {
        this.state.arr.forEach(element => {
            if(element.OR_id===OR_id){
                element.dd_id=dd_id
                element[type]={
                    index,
                    val
                }
            }
        });
        this.props.saveAndComponent(this.state.arr,this.props.AND_id);
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

    render(){        
        return(
            <>
                {
                    this.state.arr.map( item => {
                        return <SegmentItem OR_id={item.OR_id} addOrComponent={this.addOrComponent} saveVal={this.saveVal} removeVal={this.removeVal} clearOrObject={this.clearOrObject} />
                    })
                }
            </>
        )
    }
}