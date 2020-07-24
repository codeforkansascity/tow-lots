import React, { Component } from 'react';
import axios from 'axios';
import { Select } from 'antd';
import SearchResults from './SearchResults'
const Option = Select.Option;

export default class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      searchYear: "",
      searchMake: "",
      searchModel: "",
      searchKey: "",
      searchReason: ""
    }
  }

  componentWillMount() {
    axios.get('/current_vehicles')
      .then(({data})=> {
        this.setState({
          data: data
        });
    }).catch((err)=> {
      console.log(err)
    })
  }

  onSelectYear(name, value) {
    let obj = {};
    obj[name] = value;
    this.setState(obj);
    this.setState({ searchYear: obj[name] })
  }

  onSelectMake(name, value) {
    let obj = {};
    obj[name] = value;
    this.setState(obj);
    this.setState({ searchMake: obj[name] })
  }

  onSelectModel(name, value) {
    let obj = {};
    obj[name] = value;
    this.setState(obj);
    this.setState({ searchModel: obj[name] })
  }

  onSelectKey(name, value) {
    let obj = {};
    obj[name] = value;
    this.setState(obj);
    this.setState({ searchKey: obj[name] })
  }

  onSelectReason(name, value) {
    let obj = {};
    obj[name] = value;
    this.setState(obj);
    this.setState({ searchReason: obj[name] })
  }

  render() {
    // create of array of available makes and sort alphabetically
    let makes = this.state.data.map((e, key) =>  e.make)
    makes = makes.filter((e, key) => {
			return makes.indexOf(e) === key;
		}).sort((a, b) => {
		   if (b > a) return -1;
		   else if (b < a) return 1;
		   return 0;
		});
    makes.splice(0, 0, "");

    // create of array of available years and from largest to smallest
    let years = this.state.data.map((e, key) =>  e.year)
    years = years.filter((e, key) => {
      return years.indexOf(e) === key;
    }).sort((a,b) => { return b-a })
    years.splice(0, 0, "");

    // create of array of available models and sort alphabetically
    let models = this.state.data.map((e, key) =>  e.model)
    models = models.filter((e, key) => {
      return models.indexOf(e) === key;
    }).sort((a, b) => {
       if (b > a) return -1;
       else if (b < a) return 1;
       return 0;
    });
    models.splice(0, 0, "");

    return (
      <div style = {{textAlign: 'center'}}>
        <Select name="year" style={{ width: 110 }} placeholder="Year" onChange={this.onSelectYear.bind(this, Select.name)}>
            {years.map((e, key) => {
                return <Option key={key} value={e}>{e}</Option>
            })}
        </Select>
        <Select name="make" style={{ width: 110 }} placeholder="Make" onChange={this.onSelectMake.bind(this, Select.name)}>
            {makes.map((e, key) => {
                return <Option key={key} value={e}>{e}</Option>
            })}
        </Select>
        <Select name="model" style={{ width: 110 }} placeholder="Model" onChange={this.onSelectModel.bind(this, Select.name)}>
            {models.map((e, key) => {
                return <Option key={key} value={e}>{e}</Option>
            })}
        </Select>
        <Select name="key" style={{ width: 110 }} placeholder="Keys" onChange={this.onSelectKey.bind(this, Select.name)}>
          <Option value=""> </Option>
          <Option value="Yes">Yes</Option>
          <Option value="No">No</Option>
        </Select>
        <Select name="reason" style={{ width: 110 }} placeholder="Reason" onChange={this.onSelectReason.bind(this, Select.name)}>
          <Option value=""> </Option>
          <Option value="ABANDONED"> Abandoned </Option>
          <Option value="ACCIDENT"> Accident </Option>
          <Option value="ARREST"> Arrest </Option>
          <Option value="ILLEGALLY PARKED"> Illegally Parked </Option>
          <Option value="STOLEN"> Stolen </Option>
          <Option value="OTHER"> Other </Option>
        </Select>
        <br />
        <SearchResults
          searchYear = {this.state.searchYear}
          searchMake = {this.state.searchMake}
          searchModel = {this.state.searchModel}
          searchKey = {this.state.searchKey}
          searchReason = {this.state.searchReason} />
      </div>
    )
  }
}
