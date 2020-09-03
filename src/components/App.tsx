import React, { Fragment, Component } from 'react';
import './App.css';
import { Header } from './header/Header'
import { Filter } from './filter/Filter'


type flyType = {
    // Код города (iata)
    origin: string
    // Код города (iata)
    destination: string
    // Дата и время вылета туда
    date: string
    // Массив кодов (iata) городов с пересадками
    stops: Array<string>
    // Общее время перелёта в минутах
    duration: number
}

type ticketType = {
  // Цена в рублях
  price: number
  // Код авиакомпании (iata)
  carrier: string
  // Массив перелётов.
  // В тестовом задании это всегда поиск "туда-обратно" значит состоит из двух элементов
  segments: Array<flyType>
}

export type stopsFilterType = {
  [key: number]: boolean
}

type AppStateType = {
  tickets: Array<ticketType>
  stops: stopsFilterType
}

class App extends Component<{}, AppStateType> {

  allTickets: Array<ticketType> = [];

  state = {
    tickets: [],
    stops: {
      0: true,
      1: true,
      2: true,
      3: true,
    }
  }

  handleStopsChange = (stops: stopsFilterType) => {
    const predicate = (item: ticketType) => {
      const stopsFlyForth: Array<string> = item.segments[0].stops;
      const stopsFlyBack: Array<string> = item.segments[1].stops;
      return stops[stopsFlyForth.length] || stops[stopsFlyBack.length];
    }
    const tickets = this.allTickets.filter(predicate);
    this.setState({ stops, tickets });
  };
  
  render () {
    return (
      <Fragment>
        <Header />
        <main className="main-grid">
          <Filter stops={this.state.stops} handleStopsChange={this.handleStopsChange} />
          <div className="col-8">
            <div className="tabs"></div>
            <div className="tickets">
              <div className="ticket"></div>
            </div>
          </div>
        </main>
      </Fragment>
    );
  }
  
}

export default App;
