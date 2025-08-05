# Enhanced Calculator

A modern, feature-rich calculator web application with advanced functionality and beautiful design.

## 🌟 Features

### Basic Operations
- Addition (+)
- Subtraction (-)
- Multiplication (×)
- Division (/)

### Scientific Functions
- **Square Root (√)**: Calculate square root of numbers
- **Square (x²)**: Calculate square of numbers
- **Reciprocal (1/x)**: Calculate reciprocal of numbers
- **Percentage (%)**: Convert numbers to percentages

### Memory Functions
- **MC (Memory Clear)**: Clear memory storage
- **MR (Memory Recall)**: Recall value from memory
- **M+ (Memory Add)**: Add current value to memory
- **M- (Memory Subtract)**: Subtract current value from memory

### Advanced Features
- **History Display**: Shows previous calculations
- **Sign Toggle (±)**: Change positive/negative sign
- **Error Handling**: Comprehensive error messages and handling
- **Floating Point Precision**: Proper handling of decimal calculations
- **Input Validation**: Prevents invalid operations

### UI/UX Enhancements
- **Modern Design**: Beautiful gradient backgrounds and glassmorphism effects
- **Responsive Layout**: Works on desktop and mobile devices
- **Dark Mode Support**: Automatically adapts to system preference
- **Smooth Animations**: Button press effects and transitions
- **Visual Feedback**: Error animations and state indicators

## 🎯 Keyboard Shortcuts

### Numbers & Operations
- `0-9`: Number input
- `.`: Decimal point
- `+`, `-`, `*`, `/`: Basic operations
- `Enter` or `=`: Calculate result
- `Escape` or `C`: Clear all
- `Backspace` or `Delete`: Delete last entry

### Scientific Functions
- `S`: Square root
- `%`: Percentage
- `R`: Reciprocal
- `F2`: Square

### Memory Functions
- `F5`: Memory Recall (MR)
- `F6`: Memory Add (M+)
- `F7`: Memory Subtract (M-)
- `F8`: Memory Clear (MC)

## 🛠️ Technical Improvements

### Code Structure
- **Object-Oriented Design**: Calculator class with organized methods
- **Error Handling**: Try-catch blocks and validation
- **Memory Management**: Efficient state management
- **Event Handling**: Comprehensive keyboard and mouse support

### Performance
- **Optimized Calculations**: Proper floating-point precision handling
- **Memory Efficient**: Limited history storage with cleanup
- **Fast Rendering**: Efficient DOM updates

### Accessibility
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Support**: Proper ARIA labels and titles
- **High Contrast**: Dark mode and clear visual hierarchy
- **Responsive Design**: Works across different screen sizes

## 🎨 Design Features

### Visual Elements
- **Glassmorphism**: Modern translucent design
- **Gradient Backgrounds**: Beautiful color schemes
- **Smooth Animations**: Button interactions and transitions
- **Color-Coded Buttons**: Different colors for different function types
- **Hover Effects**: Interactive button states

### Layout
- **Grid System**: Organized button layout
- **Responsive Grid**: Adapts to screen size
- **Proper Spacing**: Consistent margins and padding
- **Clean Typography**: Modern font stack

## 📱 Browser Compatibility

- ✅ Chrome (Latest)
- ✅ Firefox (Latest)
- ✅ Safari (Latest)
- ✅ Edge (Latest)
- ✅ Mobile Browsers

## 🚀 Getting Started

1. Clone or download the project
2. Open `index.html` in your web browser
3. Start calculating!

## 📁 File Structure

```
Calculator/
├── index.html          # Main HTML structure
├── styles.css          # Enhanced CSS with modern design
├── calculator.js       # Enhanced JavaScript with full functionality
└── README.md          # This documentation
```

## 🔧 Customization

### Colors
Modify the CSS custom properties in `styles.css` to change the color scheme:

```css
:root {
    --primary-gradient: linear-gradient(135deg, #667eaa 0%, #764ba2 100%);
    --secondary-gradient: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%);
    /* ... other colors */
}
```

### Functions
Add new scientific functions in the `calculateFunction` method in `calculator.js`.

## 🐛 Known Issues

- None currently known. Please report any issues you encounter.

## 🤝 Contributing

Feel free to contribute by:
- Reporting bugs
- Suggesting new features
- Submitting pull requests
- Improving documentation

## 📄 License

This project is open source and available under the MIT License.

---

**Developed with ❤️ for better calculations**
