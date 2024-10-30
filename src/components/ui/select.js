import * as React from "react"

const Select = ({ value, onValueChange, children }) => {
  return (
    <select 
      value={value} 
      onChange={(e) => onValueChange(e.target.value)}
      className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
    >
      {children}
    </select>
  )
}

const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
  <div className={`flex items-center ${className || ''}`} ref={ref} {...props}>
    {children}
  </div>
))

const SelectContent = ({ children }) => <div>{children}</div>
const SelectItem = ({ value, children }) => <option value={value}>{children}</option>
const SelectValue = ({ placeholder }) => <span>{placeholder}</span>

export {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
}