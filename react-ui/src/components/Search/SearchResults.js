import React, { Component } from 'react';
import axios from 'axios';
import { Spin, message, Pagination } from 'antd';
import SearchItem from './SearchItem'

export default class SearchResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      loading: true,
      pageStart: 0,
      pageEnd: 9
    }
  }

  componentDidMount() {
    axios.get('/current_vehicles')
      .then(({data})=> {
        this.setState({
          data: data.sort((a,b) => a.lot - b.lot),
          loading: false
        });
    }).catch((err)=> {
      console.log(err)
    })
  }

  onChange(page, pageSize) {
    page = page - 1
    this.setState({
      pageStart: page * pageSize,
      pageEnd: page * pageSize + pageSize
    })
    window.scrollTo(0, 0)
  }

  returnResults(year, make, model, key, reason) {
    let results;
    // onload dsiplay all vehicles since this items are not yet defined
    if (year === "" && make === "" && model === "" && key === "" && reason === "") {
      return (
        this.state.loading === true ? <Spin /> : this.state.data.map((e, key) =>
          <div key = {key}>
            <SearchItem year = {e.year} make = {e.make} model = {e.model} vin = {e.vin} lot = {e.lot} reason = {e.reason} tow_reference = {e.tow_reference} vehicle_id = {e.vehicle_id} comments = {e.comments} keys = {e.k} front_pic = {e.front_pic} back_pic = {e.back_pic} />
          </div>
        ).slice(this.state.pageStart, this.state.pageEnd)
      )
    // search by only year
    } else if (year !== "" && make === "" && model === "" && key === "" && reason === "") {
      return (
        this.state.loading === true ? <Spin /> : this.state.data.filter(x => x.year === this.props.searchYear).map((e, key) =>
          <div key = {key}>
            <SearchItem year = {e.year} make = {e.make} model = {e.model} vin = {e.vin} lot = {e.lot} reason = {e.reason} tow_reference = {e.tow_reference} vehicle_id = {e.vehicle_id} comments = {e.comments} keys = {e.k} front_pic = {e.front_pic} back_pic = {e.back_pic} />
          </div>
        ).slice(this.state.pageStart, this.state.pageEnd)
      )
      // search by only make
    } else if (year === "" && make !== "" && model === "" && key === "" && reason === "") {
        return (
          this.state.loading === true ? <Spin /> : this.state.data.filter(x => x.make === this.props.searchMake).map((e, key) =>
            <div key = {key}>
              <SearchItem year = {e.year} make = {e.make} model = {e.model} vin = {e.vin} lot = {e.lot} reason = {e.reason} tow_reference = {e.tow_reference} vehicle_id = {e.vehicle_id} comments = {e.comments} keys = {e.k} front_pic = {e.front_pic} back_pic = {e.back_pic} />
            </div>
          ).slice(this.state.pageStart, this.state.pageEnd)
        )
        // search by only model
    } else if (year === "" && make === "" && model !== "" && key === "" && reason === "") {
        return (
          this.state.loading === true ? <Spin /> : this.state.data.filter(x => x.model === this.props.searchModel).map((e, key) =>
            <div key = {key}>
              <SearchItem year = {e.year} make = {e.make} model = {e.model} vin = {e.vin} lot = {e.lot} reason = {e.reason} tow_reference = {e.tow_reference} vehicle_id = {e.vehicle_id} comments = {e.comments} keys = {e.k} front_pic = {e.front_pic} back_pic = {e.back_pic} />
            </div>
          ).slice(this.state.pageStart, this.state.pageEnd)
        )
      // search by only keys
    } else if (year === "" && make === "" && model === "" && key !== "" && reason === "") {
        return (
          this.state.loading === true ? <Spin /> : this.state.data.filter(x => (x.k === 'K' ? 'Yes' : 'No') === this.props.searchKey).map((e, key) =>
          <div key = {key}>
            <SearchItem year = {e.year} make = {e.make} model = {e.model} vin = {e.vin} lot = {e.lot} reason = {e.reason} tow_reference = {e.tow_reference} vehicle_id = {e.vehicle_id} comments = {e.comments} keys = {e.k} front_pic = {e.front_pic} back_pic = {e.back_pic} />
          </div>
          ).slice(this.state.pageStart, this.state.pageEnd)
        )
      // search by only reason
    } else if (year === "" && make === "" && model === "" && key === "" && reason !== "") {
        return (
          this.state.loading === true ? <Spin /> : this.state.data.filter(x => x.reason === this.props.searchReason).map((e, key) =>
            <div key = {key}>
              <SearchItem year = {e.year} make = {e.make} model = {e.model} vin = {e.vin} lot = {e.lot} reason = {e.reason} tow_reference = {e.tow_reference} vehicle_id = {e.vehicle_id} comments = {e.comments} keys = {e.k} front_pic = {e.front_pic} back_pic = {e.back_pic} />
            </div>
          ).slice(this.state.pageStart, this.state.pageEnd)
        )
    // search by year and make
    } else if (year !== "" && make !== "" && model === "" && key === "" && reason === "") {
      results =
      this.state.loading === true ? <Spin /> :
      this.state.data
        .filter(x => x.year === this.props.searchYear && x.make === this.props.searchMake)
        .map((e, key) =>
          <div key = {key}>
            <SearchItem year = {e.year} make = {e.make} model = {e.model} vin = {e.vin} lot = {e.lot} reason = {e.reason} tow_reference = {e.tow_reference} vehicle_id = {e.vehicle_id} comments = {e.comments} keys = {e.k} front_pic = {e.front_pic} back_pic = {e.back_pic} />
          </div>
        ).slice(this.state.pageStart, this.state.pageEnd)
      if (results.length === 0) message.error('No Results Found');
      return (results)
     // search by year and model
     } else if (year !== "" && make === "" && model !== "" && key === "" && reason === "") {
        results =
        this.state.loading === true ? <Spin /> :
        this.state.data
          .filter(x => x.year === this.props.searchYear && x.model === this.props.searchModel)
          .map((e, key) =>
            <div key = {key}>
              <SearchItem year = {e.year} make = {e.make} model = {e.model} vin = {e.vin} lot = {e.lot} reason = {e.reason} tow_reference = {e.tow_reference} vehicle_id = {e.vehicle_id} comments = {e.comments} keys = {e.k} front_pic = {e.front_pic} back_pic = {e.back_pic} />
            </div>
          ).slice(this.state.pageStart, this.state.pageEnd)
        if (results.length === 0) message.error('No Results Found');
        return (results)
        // search by make and model
      } else if (year === "" && make !== "" && model !== "" && key === "" && reason === "") {
         results =
         this.state.loading === true ? <Spin /> :
         this.state.data
           .filter(x => x.make === this.props.searchMake && x.model === this.props.searchModel)
           .map((e, key) =>
             <div key = {key}>
               <SearchItem year = {e.year} make = {e.make} model = {e.model} vin = {e.vin} lot = {e.lot} reason = {e.reason} tow_reference = {e.tow_reference} vehicle_id = {e.vehicle_id} comments = {e.comments} keys = {e.k} front_pic = {e.front_pic} back_pic = {e.back_pic} />
             </div>
           ).slice(this.state.pageStart, this.state.pageEnd)
         if (results.length === 0) message.error('No Results Found');
         return (results)
        // search by make and reason
      } else if (year === "" && make !== "" && model === "" && key === "" && reason !== "") {
          results =
          this.state.loading === true ? <Spin /> :
          this.state.data
            .filter(x => x.make === this.props.searchMake && x.reason === this.props.searchReason)
            .map((e, key) =>
              <div key = {key}>
                <SearchItem year = {e.year} make = {e.make} model = {e.model} vin = {e.vin} lot = {e.lot} reason = {e.reason} tow_reference = {e.tow_reference} vehicle_id = {e.vehicle_id} comments = {e.comments} keys = {e.k} front_pic = {e.front_pic} back_pic = {e.back_pic} />
              </div>
            ).slice(this.state.pageStart, this.state.pageEnd)
          if (results.length === 0) message.error('No Results Found');
          return (results)
          // search by year and reason
        } else if (year !== "" && make === "" && model === "" && key === "" && reason !== "") {
            results =
            this.state.loading === true ? <Spin /> :
            this.state.data
              .filter(x => x.year === this.props.searchYear && x.reason === this.props.searchReason)
              .map((e, key) =>
                <div key = {key}>
                  <SearchItem year = {e.year} make = {e.make} model = {e.model} vin = {e.vin} lot = {e.lot} reason = {e.reason} tow_reference = {e.tow_reference} vehicle_id = {e.vehicle_id} comments = {e.comments} keys = {e.k} front_pic = {e.front_pic} back_pic = {e.back_pic} />
                </div>
              ).slice(this.state.pageStart, this.state.pageEnd)
            if (results.length === 0) message.error('No Results Found');
            return (results)
         }
    }

    render() {
      return (
        <div style = {{textAlign: 'center', marginTop: 20}}>
          {this.returnResults(this.props.searchYear, this.props.searchMake, this.props.searchModel, this.props.searchKey, this.props.searchReason)}
          <Pagination
            showQuickJumper
            style = {{margin: 20, bottom: 0, width: '100%'}}
            defaultCurrent={1}
            pageSize = {9}
            onChange={this.onChange.bind(this)}
            total={this.state.data.length} />
        </div>
      )
    }
}
