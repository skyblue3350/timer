import * as React from 'react';
import { Button, Grid, Progress, Table } from 'semantic-ui-react';

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

    render(): JSX.Element {
        return (
            <Grid padded={false}>
                <Grid.Row columns={1} centered>
                    <Progress percent={100} color='green' size='tiny' attached='bottom'/>
                    <Button.Group widths={3}>
                        <Button content='+'/>
                        <Button content='+'/>
                        <Button content='+'/>
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
                        <Button content='-'/>
                        <Button content='-'/>
                        <Button content='-'/>
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