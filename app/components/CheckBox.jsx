import React from 'react'

const CheckBox = () => {
  return (
    <div>CheckBox
      <div class="checkboxes__row">
    <div class="checkboxes__item">
      <label class="checkbox style-f">
        <input type="checkbox"/>
        <div class="checkbox__checkmark"></div>
        <div class="checkbox__body">Style F</div>
      </label>
    </div>
    <div class="checkboxes__item">
      <label class="checkbox style-f">
        <input type="checkbox" checked="checked"/>
        <div class="checkbox__checkmark"></div>
        <div class="checkbox__body">Style F</div>
      </label>
    </div>
  </div>
  <div class="checkboxes__row">
    <div class="checkboxes__item">
      <label class="checkbox style-g">
        <input type="checkbox"/>
        <div class="checkbox__checkmark"></div>
        <div class="checkbox__body">Style
    </div>
  )
}

export default CheckBox