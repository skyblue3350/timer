import * as React from 'react';
import { Button, Grid, Progress, Table } from 'semantic-ui-react';

type TimeLabel = 'hour' | 'min' | 'sec'
const TimeLabel = ['hour', 'min', 'sec']

export interface Props {
}

export interface State {
    presets: number[]
    time: {
        hour: number
        min: number
        sec: number
    }
}

export default class App extends React.Component<Props, State> {
    timer: void

    constructor(props: Props) {
        super(props)

        this.state = {
            presets: [],
            time: {
                hour: 0,
                min: 0,
                sec: 0,
            },
        }
    }

    timeToSec(time: State["time"]) {
        return time.hour * 3600 + time.min * 60 + time.sec
    }

    secToTime(sec: number): State["time"] {
        return {
            hour: sec / 3600 | 0,
            min: sec % 3600 / 60 | 0,
            sec: sec % 60,
        }
    }

    addOne(name: TimeLabel) {
        let sec = this.timeToSec(this.state.time)
        sec += name == 'hour'? 3600 : name == 'min'? 60 : 1
        this.setState({time: this.secToTime(sec)})
    }

    subOne(name: TimeLabel) {
        let sec = this.timeToSec(this.state.time)
        sec -= name == 'hour'? 3600 : name == 'min'? 60 : 1
        sec = sec < 0? 0 : sec
        this.setState({time: this.secToTime(sec)})
    }

    render(): JSX.Element {
        console.log(this.state.time)
        return (
            <Grid padded={false}>
                <Grid.Row columns={1} centered>
                    <Progress percent={100} color='green' size='tiny' attached='bottom'/>
                    <Button.Group widths={3}>
                        {Object.keys(this.state.time).map((key) => {
                            return <Button key={key} onClick={() => this.addOne(key as TimeLabel)} content='+' />
                        })}
                    </Button.Group>
                </Grid.Row>

                <Grid.Row columns={3}>
                    {Object.entries(this.state.time).map(([key, value]: [string, number]) => {
                        return <Grid.Column
                            key={key}
                            className={key}
                            textAlign='center'
                            verticalAlign='middle'
                            style={{fontSize: '25vh', lineHeight: '1em'}}
                            onKeyPress={(e: Event) => console.log(e)}>
                            {('0' + value).slice(-2)}
                        </Grid.Column>
                    })}
                </Grid.Row>

                <Grid.Row columns={1} centered>
                    <Button.Group widths={3}>
                        {Object.keys(this.state.time).map((key) => {
                            return <Button key={key} onClick={() => this.subOne(key as TimeLabel)} content='-' />
                        })}
                    </Button.Group>
                </Grid.Row>

                <Grid.Row columns={1} centered>
                    <Button.Group widths={4}>
                        <Button content='Start' color='green' />
                        <Button content='Stop' color='orange' />
                        <Button content='Reset' color='red' />
                        <Button content='Add Preset' color='blue'/>
                    </Button.Group>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column>
                        <Table striped unstackable>
                            <Table.Body>
                                {this.state.presets.map((preset: number) => {
                                <Table.Row>
                                    <Table.Cell>
                                        {preset}
                                    </Table.Cell>
                                    <Table.Cell textAlign='right'>
                                        <Button color='blue' circular icon={{name: 'add'}} />
                                        <Button color='red' circular icon={{name: 'minus'}} />
                                    </Table.Cell>
                                </Table.Row>
                                })}
                            </Table.Body>
                        </Table>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}