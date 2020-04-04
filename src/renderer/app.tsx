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

    reset() {
        this.setState({
            time: {hour: 0, min: 0, sec: 0},
        })
    }

    addPreset() {
        this.setState({
            presets: [
                ...this.state.presets,
                this.timeToSec(this.state.time)
            ]
        })
    }

    setPreset(index: number) {
        this.setState({
            time: this.secToTime(this.state.presets[index])
        })
    }

    removePreset(index: number) {
        this.setState({
            presets: this.state.presets.filter((v, i) => i != index)
        })
    }

    render(): JSX.Element {
        console.log(this.state.presets)
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
                        <Button onClick={() => this.reset()} content='Reset' color='red' />
                        <Button onClick={() => this.addPreset()} content='Add Preset' color='blue'/>
                    </Button.Group>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column>
                        <Table striped unstackable>
                            <Table.Body>
                                {this.state.presets.map((preset: number, index: number) => {
                                    const time = this.secToTime(preset)
                                    return <Table.Row>
                                        <Table.Cell>
                                            {`${time.hour}:${('0' + time.min).slice(-2)}:${('0' + time.sec).slice(-2)}`}
                                        </Table.Cell>
                                        <Table.Cell textAlign='right'>
                                            <Button onClick={() => this.setPreset(index)} color='blue' circular icon={{name: 'add'}} />
                                            <Button onClick={() => this.removePreset(index)} color='red' circular icon={{name: 'minus'}} />
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