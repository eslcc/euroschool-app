import {StyleSheet} from 'react-native';

const normalColors = {
    background: '#F9F9F9',
    secondLevelBackground: '#f5f5f5',
    primaryText: '#212121',
    subText: '#727272',
    red: '#D32F2F',
    schedule: {
        monday: '#ffc400', // Amber
        tuesday: '#FF5722', // deep orange
        wednesday: '#FF9800', // orange
        thursday: '#FFEB3B', // yellow
        friday: '#CDDC39', // lime
        base: '#00bcd4',
    },
    tiles: [
        '#FF5252',
        '#FF4081',
        '#E040FB',
        '#7C4DFF',
        '#536DFE',
        '#448AFF',
        '#03A9F4',
        '#00BCD4',
        '#009688',
        '#4CAF50',
        '#8BC34A',
        '#CDDC39',
        '#FFEB3B',
        '#FFC107',
        '#FF9800',
        '#FF5722',
    ],
};

const darkColors = {
    background: '#303030',
    secondLevelBackground: '#212121',
    primaryText: '#ffffff',
    subText: 'rgba(255, 255, 255, 0.87)',
};

global.secretDarkThemeDoNotUseOrYouWillBeFired = true;

export const colors = (global.secretDarkThemeDoNotUseOrYouWillBeFired) ? Object.assign(normalColors, darkColors) : normalColors; //eslint-disable-line

const normalStyles = {
    t: {
        color: colors.primaryText,
    },
    fill: {
        flex: 1,
        backgroundColor: colors.background,
    },
    core: {
        screenContainer: {
            paddingHorizontal: 16,
            paddingTop: 80,
            paddingBottom: 100,
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
            backgroundColor: colors.background,
        },
        mainText: {},
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
    },
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
    exercises: {
        mainView: {
            // marginTop: 80,
            // marginBottom: 80,
            paddingBottom: 1,
        },
        list: {
            marginBottom: 64
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
            backgroundColor: colors.subText,
            padding: 4,
        },
        grade: {
            marginVertical: 4,
            fontSize: 18,
            color: colors.primaryText,
        },
    },
    login: StyleSheet.create({
        background: {
            position: 'absolute',
            top: 0,
            left: 0,
            flex: 1,
        },
        secondaryText: {
            color: colors.subText,
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
            backgroundColor: colors.background
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
            color: colors.subText
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

module.exports = (global.secretDarkThemeDoNotUseOrYouWillBeFired) ? normalStyles : normalStyles; // TODO change first normalStyles to secretDarkStyles
module.exports.colors = colors;
