import React, { Component } from 'react';
import AuctionTime from './AuctionTime'
import SearchBar from './SearchBar'

export default class Search extends Component {
  render() {
    return (
      <div>
        <AuctionTime />
        <SearchBar />
      </div>
    )
  }
}
