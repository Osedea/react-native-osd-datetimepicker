import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    DatePickerIOS,
    DatePickerAndroid,
    Platform,
    Text,
    TimePickerAndroid,
} from 'react-native';
import Button from 'react-native-osd-simple-button';

const styles = StyleSheet.create({
    dateDisplay: {
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default class DateTimePicker extends Component {
    static propTypes = {
        androidButtonText: React.PropTypes.string,
        date: React.PropTypes.string,
        mode: React.PropTypes.oneOf([ // Android only
            'datetime',
            'date',
            'time',
        ]),
        onChange: React.PropTypes.func.isRequired,
        renderAndroidButton: React.PropTypes.func,
    };

    static defaultProps = {
        androidButtonText: 'Date',
    };

    constructor(props) {
        super(props);
        const currentDate = new Date();

        this.state = {
            date: props.date
                ? this.getDate(props.date)
                : new Date(),
            year: currentDate.getFullYear(),
            month: currentDate.getMonth() + 1,
            day: currentDate.getUTCDate() + 1,
            hour: currentDate.getHours(),
            minute: currentDate.getMinutes(),
            parsedDate: currentDate,
            mode: props.mode || 'datetime',
        };
    }

    componentWillReceiveProps(nextProps) {
        let date = new Date();

        if (nextProps.date) {
            if (typeof nextProps.date === 'object') {
                date = nextProps.date;
            } else {
                date = this.getDate(nextProps.date);
            }
        }

        this.setState({
            date,
        });
    }

    getDate = (stringDate) => {
        const date = new Date(stringDate);

        const parsedDate = new Date(
            Date.UTC(
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
                date.getHours(),
                date.getMinutes()
            )
        );

        this.setState({
            parsedDate,
        });

        return parsedDate;
    };

    handleDateChange = (date) => {
        this.setState({ parsedDate: date });
        this.props.onChange(date);
    };

    handleAndroidPickerDisplay = () => {
        DatePickerAndroid.open({
            date: this.state.date,
        })
        .then(({ action, year, month, day }) => {
            if (action !== DatePickerAndroid.dismissedAction) {
                this.setState({
                    year,
                    month,
                    day,
                });

                TimePickerAndroid.open({
                    date: this.state.date,
                    is24Hour: true,
                })
                .then(({ action, hour, minute }) => {
                    if (action !== TimePickerAndroid.dismissedAction) {
                        const dateWithHoursAndMinutes = new Date(
                            this.state.year,
                            this.state.month,
                            this.state.day,
                            hour,
                            minute,
                            1
                        );

                        this.setState({
                            hour,
                            minute,
                        });

                        this.handleDateChange(dateWithHoursAndMinutes);
                    }
                })
                .catch(({ code, message }) => console.info(`Cannot open date picker ${code}`, message));
            }
        })
        .catch(({ code, message }) => console.info(`Cannot open date picker ${code}`, message));
    };
    render() {
        if (Platform.OS === 'ios') {
            return (
                <View>
                    <DatePickerIOS
                        date={this.state.date}
                        mode={this.state.mode}
                        onDateChange={this.handleDateChange}
                    />
                </View>
            );
        }

        return (
            <View>
                {this.props.renderAndroidButton
                    ? (this.props.renderAndroidButton)()
                    : <View>
                        <Text style={styles.dateDisplay}>
                            {this.state.parsedDate.toLocaleString()}
                        </Text>
                        <Button
                            onPress={this.handleAndroidPickerDisplay}
                            text={this.props.androidButtonText.toUpperCase()}
                        />
                    </View>
                }
            </View>
        );
    }
}
