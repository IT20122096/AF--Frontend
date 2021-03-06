import React, { Component } from 'react'
import { getTopic, updateTopic } from "../../services/IT20192082/panelService";
export default class TopicEdit extends Component {

  constructor(props){
    super(props);
    this.state = {
      topic:"",
      groupid:"",
      message:"",
      status:"",
      field:""
    }
  }

  handleInputChange = (e) => {
    const {name,value} = e.target;

    this.setState({
      ...this.state,
      [name]:value
    })
  }

  onSubmit = (e) => {

    e.preventDefault();
    const id = this.props.match.params.id;
    const {topic,groupid,message,status,field} = this.state;

    const data ={
      topic:topic,
      groupid:groupid,
      message:message,
      status:status,
      field:field
    }

    console.log(data)

    updateTopic(id, data).then((res) =>{
      if(res.data.success){
        alert("Topic Updated")
        this.setState(
          {
            topic:"",
            groupid:"",
            message:"",
            status:"",
            field:""
          }
        )
      }
    })

  }

  async componentDidMount(){

    const id = this.props.match.params.id;
  
    await getTopic(id).then((res) => {
      if(res.data.success) {
        this.setState({
          topic:res.data.topic,
          groupid: res.data.topic.groupid,
          message: res.data.topic.message,
          status: res.data.topic.status,
          field: res.data.topic.field,
        });
        console.log(this.state.topic);
      }
    });
  
  }

  

  render() {

    const {topic,groupid,field} = this.state.topic;

    return (
      <div className='container'>

<br/>
<br/>

      <form>
      <fieldset disabled>
    <div className="form-group">
      <label for="disabledTextInput">Topic</label>
      <input type="text" id="disabledTextInput" className="form-control" placeholder={topic}></input>
    </div>
    <br/>
    <div className="form-group">
      <label for="disabledTextInput">GroupID</label>
      <input type="text" id="disabledTextInput" className="form-control" placeholder={groupid}></input>
    </div>
    <br/>
    <div className="form-group">
      <label for="disabledTextInput">Field</label>
      <input type="text" id="disabledTextInput" className="form-control" placeholder={field}></input>
    </div>
    <br/>
    </fieldset>
 

    <div className='need-validation' noValidate>
      <label style={{marginBottom: '15px'}}>Status</label>
      <select className="form-select" aria-label="Default select example" name='status' onChange={this.handleInputChange}>
        <option value={this.state.status} selected>Pending</option>
        <option value="approved">Approve</option>
        <option value="reject">Reject</option>
      </select>
    </div>
      <br/>
    <div className='form-group' style={{marginBottom: '15px'}}>
      <label style={{marginBottom: '5px'}}>Message</label>
      <input type='text'
      className='form-control'
      name='message'
      placeholder='Enter Message'
      value={this.state.message}
      onChange={this.handleInputChange}/>
    </div>
    <button className='btn btn-success' type="submit" style={{marginBottom: '15px'}} onClick={this.onSubmit}>
      <i className='far fa-check-square'></i>&nbsp; Save
    </button>

    
  
</form>
        
      </div>
    )
  }
}
