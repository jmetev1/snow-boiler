import React from 'react';
import { Button } from 'evergreen-ui/commonjs/buttons';
import './App.css'
import southLA from './image/la_south.gif'
import { url } from './url';
import Authorized from './Authorized';

class App extends React.Component {
  submit = region => {
    console.log(region, 11)
    fetch(url + 'login', {
      method: "POST",
      body: JSON.stringify({ region }),
      headers: { 'Content-Type': 'application/json' }
    }).then(r => r.json()).then(r => {
      console.log(r, '16 app')
      if (r) localStorage.setItem("region", r);
      // console.log(localStorage)
      // console.log('logged in as', region)
    })
  }
  componentDidMount() {
    this.props.region.then(res => {
      return res.json()
    }).then(region => {
      if (region) localStorage.setItem("region", region);
      this.setState({ region })
    })
  }
  Choose = () => (
    <div className='login'>
      {["North Louisiana", "North Mississippi", "South Mississippi"].map(region => <div key={region}>
        <Button onClick={this.submit.bind(this, region)} appearance="primary">{region}
        </Button>
      </div>)}
      <button >
        <img alt="South Louisiana" className='south-la-button' src={southLA} />
        South Louisiana,
      </button>
    </div>
  )
  render() {
    return (this.state && this.state.region) ? <Authorized /> : < this.Choose />
  }
}

export default App;


