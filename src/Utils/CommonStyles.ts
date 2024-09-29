import {Fonts} from '../Assets/Fonts/Fonts'
import {Colors} from './Colors'
import {font} from './Responsive'

export const CommonStyles = {
  flex: {flex: 1},
  whatsapp_button: {
    height: 40,
    width: 40,
    backgroundColor: Colors.green,
    borderRadius: 50
  },
  shadow: {
    elevation: 3,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65
  },
  shadow5: {
    elevation: 5,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.39,
    shadowRadius: 5.65
  },
  textUnderLine: {
    textDecorationLine: 'underline'
  },
  regularText: {
    fontSize: font(4),
    fontFamily: Fonts.regular,
    color: Colors.black
  }
}

export const CommonStylesFn = {
  text: (size = 3, color = Colors.black, fontFamily = Fonts.regular) => {
    return {
      fontSize: (size && font(size)) || font(3.5),
      color,
      fontFamily
    }
  }
}
