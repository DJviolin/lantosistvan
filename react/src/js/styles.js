const variables = {
  fonts: {
    // serif
    Georgia: 'Georgia, \'Times New Roman\', Times, serif',
    Baskerville: 'Baskerville, \'Baskerville Old Face\', \'Hoefler Text\', Garamond, Times New Roman, serif',
    Garamond: 'Garamond, Baskerville, \'Baskerville Old Face\', \'Hoefler Text\', Times New Roman, serif',
    TimesNewRoman: 'TimesNewRoman, \'Times New Roman\', Times, Baskerville, Georgia, serif',
    // sans-serif
    Helvetica: '\'Helvetica Neue\', Helvetica, Arial, sans-serif',
    HelveticaNeue: '\'Helvetica Neue\', Helvetica, Arial, sans-serif',
    HelveticaNeueLight: '\'HelveticaNeue-Light\', \'Helvetica Neue Light\', \'Helvetica Neue\', Helvetica, Arial, \'Lucida Grande\', sans-serif',
    TrebuchetMS: '\'Trebuchet MS\', \'Lucida Sans Unicode\', \'Lucida Sans\', Tahoma, sans-serif',
    Verdana: 'Verdana, Geneva, sans-serif',
    GillSans: '\'Gill Sans\', \'Gill Sans MT\', Calibri, sans-serif',
    Futura: 'Futura, \'Trebuchet MS\', Arial, sans-serif',
  },
  fontStyles: {
    fontSize: '16px',
    lineHeight: '24px',
  },
};

const styles = {
  /*fonts: {
    Georgia: 'Georgia, \'Times New Roman\', Times, serif',
  },*/
  //Styles
  container: {
    textAlign: 'center',
    fontFamily: variables.fonts.Georgia,
    //get fontFamily() { return styles.fonts.Georgia; },
    fontSize: variables.fontStyles.fontSize,
    lineHeight: variables.fontStyles.lineHeight,
  },
  logo: {
    animation: 'App-logo-spin infinite 20s linear',
    height: 80,
  },
  header: {
    backgroundColor: '#222',
    height: 150,
    padding: 20,
    color: 'white',
  },
  intro: {
    fontSize: 'large',
  },
};

module.exports = styles;
