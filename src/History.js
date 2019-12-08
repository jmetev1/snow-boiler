//not used
import React from 'react';
import { url } from './url';
import {
  Pane, Button, SelectField, MyTextInputField, Text, Select,
} from 'evergreen-ui';
import { Wrapper } from './Fields';

const MyPane = ({ children }) => (
  <Pane
    elevation={0}
    float="left"
    backgroundColor="white"
    width={200}
    height={120}
    margin={24}
    display="flex"
    justifyContent="center"
    alignItems="center"
    flexDirection="column"
  >
    {children}
    <Text>Elevation 0</Text>
    <Text size={300}>Flat Panes</Text>
  </Pane>

)
const Visit = ({ amountSpent, clinicName, provider, date, purpose, ...rest }) =>
  <MyPane>
    <div>For {provider}</div>
    <div>At {clinicName}</div>
    <div>You Spent: {amountSpent} </div>
  </MyPane>

export class History extends React.Component {
  constructor() {
    super();
    this.state = {}
  }
  componentDidMount() {
    fetch(url + 'visits').then(d => d.json()).then(allVisits => {
      this.setState({ allVisits })
      // const f = allVisits.filter(({ clinicName }) => clinicName)
      // console.log(allVisits)
      // this.setState({ allVisits: f, chosen: 'all' }, () => {
      //   const byName = f.reduce((a, c) => {
      //     console.log(c)
      //     if (a[c.provider]) a[c.provider].push(c);
      //     else a[c.provider] = [c]
      //     return a;
      //   }, {});
      //   this.setState({ byName })
      // })
    })
  }
  providerPicker = name => <div>
    <Select defaultValue="all" onChange={({ target: { value } }) => this.setState({ chosen: value })}>
      <option value='all'>All</option>
      {Object.keys(this.state.byName).map(n => <option value={n} key={n}>{n}</option>)}
    </Select>
  </div>
  render() {
    console.log(this.state)
    const { allVisits } = this.state;
    // const toShow = allVisits && (chosen === 'all' ? allVisits : byName[chosen])
    console.log(allVisits)
    return (
      <Wrapper>
        {allVisits ? Object.entries(allVisits[0]).map(([key, value]) => (
          <div>for {value.name} you've spent ${value.amount}</div>
        )) : 'loading'

        }
        {/* {toShow ? <>
          {byName && this.providerPicker()}
          <div>For this provider your total is {(toShow.reduce((a, c) => a + (c.amountSpent || 0), 0)).toFixed(2)}</div>
          <div>Currently Showing {toShow.length} results</div>
          {toShow.map(expense => expense.amountSpent ?
            <Visit key={expense._id} {...expense} /> : null
          )}
        </> : "loading"} */}
      </Wrapper>
    );
  }
}



