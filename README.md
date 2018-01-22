# react-native-osd-datetimepicker
A DateTime Picker for Android and iOs for react-native

For react-native v0.26+

# How it looks

### Closed

<img alt='Before' src='images/example-empty.png' height='200px' /> <img alt='After' src='images/example-set.png' height='200px' />

### Open

Android

<img alt='Android-date' src='images/example-android-date.png' height='200px' /> <img alt='Android-hours' src='images/example-android-time-hours.png' height='200px' /> <img alt='Android-minutes' src='images/example-android-time-minutes.png' height='200px' />

iOs

<img alt='IOS-date' src='images/example-ios-date.png' height='200px' /> <img alt='IOS-hours' src='images/example-ios-time.png' height='200px' /> <img alt='IOS-minutes' src='images/example-ios-datetime.png' height='200px' />

# Output

For `time` : `HH:MM:00`

For `date` : Local date string (parsable in `new Date()`)

For `datetime` : Local datetime string (parsable in `new Date()`)

# Usage example

```jsx
<DateTimePicker
    containerStyle={styles.container}
    iosDoneButtonText={styles.iosDoneButtonText}
    iosDoneButtonStyle={styles.iosDoneButton}
    iosClosePickerButtonTextContainerStyle={styles.iosClosePickerButtonText}
    iosClosePickerButtonTextStyle={styles.iosClosePickerButton}
    label={'Choose a date'}
    date={this.state.value} // To have a controlled component behaviour
    mode={'date'}
    onChange={this.handleDateChange}
/>
```

# Properties

Property Name | Type | Remark
--- | --- | ---
date | React.PropTypes.string
minDate | React.PropTypes.string
maxDate | React.PropTypes.string
mode | React.PropTypes.oneOf([ 'datetime', 'date', 'time' ]) |
onChange | React.PropTypes.func.isRequired
iosDoneButtonText | React.PropTypes.string
iosDoneButtonStyle | Button.propTypes.containerStyle | see [react-native-osd-simple-button](http://github.com/osedea/react-native-osd-simple-button)
iosClosePickerButtonTextContainerStyle | Button.propTypes.textContainerStyle | see [react-native-osd-simple-button](http://github.com/osedea/react-native-osd-simple-button)
iosClosePickerButtonTextStyle | Button.propTypes.textStyle | see [react-native-osd-simple-button](http://github.com/osedea/react-native-osd-simple-button)
renderAndroidButton | React.PropTypes.func
