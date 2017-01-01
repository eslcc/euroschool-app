import { StyleSheet } from 'react-native';

const normalColors = {
    background: '#F9F9F9',
    primaryText: '#212121',
    subText: '#727272',
    red: '#D32F2F',
    schedule: {
        monday: '#ffc400', // Amber
        tuesday: '#FF9800', // orange
        wednesday: '#4CAF50', // green
        thursday: '#00E676', // light green
        friday: '#8BC34A', // light green
        base: '#00bcd4',
    },
};

const darkColors = {};

const colors = (global.secretDarkThemeDoNotUseOrYouWillBeFired) ? darkColors : normalColors; //eslint-disable-line

const normalStyles = {
    t: {
        color: colors.primaryText,
    },
    core: StyleSheet.create({
        screenContainer: {
            marginHorizontal: 16,
            marginTop: 54,
            marginBottom: 100,
            flex: 1,
            backgroundColor: colors.background,
        },
        screenContainerNoTabs: {
            marginHorizontal: 16,
            marginTop: 64,
            flex: 1,
        },
        fill: {
            flex: 1,
        },
        mainText: {
        },
        subText: {
            fontSize: 24,
            color: colors.subText,
            marginVertical: 2,
        },
        textMargin: {
            marginVertical: 2,
        },
        error: {
            color: colors.red,
        },
        button: {
            flex: 1,
            height: 48,
            paddingVertical: 8,
            margin: 4,
        },
        bold: {
            fontWeight: 'bold',
            color: colors.primaryText,
        },
        center: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        card: {
            elevation: 1,
            marginVertical: 8,
            marginHorizontal: 16,
        },
    }),
    drawer: StyleSheet.create({
        header: {
            height: 56,
            flex: 1,
            paddingVertical: 8,
            marginLeft: 16,
            fontWeight: 'bold',
            color: colors.primaryText,
        },
        buttonText: {
            color: colors.primaryText,
            left: 72,
        },
        view: {
            marginTop: 56,
        },
        nyiWarning: {
            fontWeight: 'bold',
            color: colors.red,
        },
    }),
    exercises: StyleSheet.create({
        mainView: {
            top: 54,
            flex: 1,
            marginBottom: 100,
        },
        list: {
            paddingBottom: 128,
        },
        nowMarker: {
            backgroundColor: '#D32F2F',
            height: 1,
            flex: 1,
        },
        nowText: {
            textAlign: 'center',
            color: '#f44336',
        },
        comment: {
            flex: 1,
            paddingBottom: 25,
            marginTop: 25,
            backgroundColor: '#eee',
            padding: 4,
        },
        grade: {
            marginVertical: 4,
            fontSize: 18,
            color: '#212121',
        },
    }),
    login: StyleSheet.create({
        background: {
            position: 'absolute',
            top: 0,
            left: 0,
            flex: 1,
        },
        secondaryText: {
            color: '#565656',
            fontSize: 24,
        },
    }),
    schedule: StyleSheet.create({
        portraitScheduleContainer: {
            position: 'absolute',
            top: 0,
            left: 0,
            flex: 1,
            flexDirection: 'row',
        },
        day: {
            height: 64,
            alignItems: 'center',
            justifyContent: 'center',
        },
        landscapeDay: {
            height: 64,
            alignItems: 'center',
            justifyContent: 'center',
            top: 0,
            position: 'absolute',
        },
        hour: {
            fontSize: 24,
            position: 'absolute',
            left: 0,
        },
        monday: {
            backgroundColor: colors.schedule.monday,
        },
        tuesday: {
            backgroundColor: colors.schedule.tuesday,
        },
        wednesday: {
            backgroundColor: colors.schedule.wednesday,
        },
        thursday: {
            backgroundColor: colors.schedule.thursday,
        },
        friday: {
            backgroundColor: colors.schedule.friday,
        },
        portraitCourse: {
            position: 'absolute',
            left: 80,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginRight: 16,
            borderRadius: 2,
            padding: 8,
            elevation: 1,
        },
        portraitCourseInnerContainer: {
            flexDirection: 'column',
        },
        portraitCourseLabelLevel1: {
            fontSize: 16,
        },
        portraitCourseLabelLevel2: {
            fontSize: 12,
        },
        landscapeCourse: {
            position: 'absolute',
            marginRight: 16,
            borderRadius: 2,
            paddingLeft: 8,
            paddingTop: 0,
            elevation: 1,
            marginBottom: 16,
        },
    }),
};

const secretDarkStyles = StyleSheet.create({});

module.exports = (global.secretDarkThemeDoNotUseOrYouWillBeFired) ? secretDarkStyles : normalStyles;
module.exports.colors = colors;
