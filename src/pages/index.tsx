import React, { useState, useEffect } from "react"
import Fab from "@material-ui/core/Fab"
import ColorizeIcon from "@material-ui/icons/Colorize"
import PaletteIcon from "@material-ui/icons/Palette"
import { makeStyles } from "@material-ui/core/styles"
import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core"
import { Save } from "@material-ui/icons"
import { SwatchesPicker, ChromePicker, ColorResult } from "react-color"
import "../assets/sass/index.scss"

interface State {
  defaultColor: ColorResult
  backgroundColor: ColorResult
  recentColors: ColorResult[]
  usePalette: boolean
}

const STORAGE_KEY = "soft-light-data"

const initialState: State = {
  defaultColor: {
    hex: "#000000",
    hsl: { h: 0, s: 0, l: 0, a: 0 },
    rgb: { r: 0, g: 0, b: 0, a: 0 },
  },
  backgroundColor: {
    hex: "#000000",
    hsl: { h: 0, s: 0, l: 0, a: 0 },
    rgb: { r: 0, g: 0, b: 0, a: 0 },
  },
  recentColors: [],
  usePalette: false,
}

export default function Home() {
  const storage = localStorage.getItem(STORAGE_KEY)
  const [state, setState] = useState<State>(
    (storage && JSON.parse(storage)) || initialState
  )
  const [usePalette, setUsePalette] = useState(state.usePalette || false)

  useEffect(() => {
    saveLocalStorage()
  }, [state])

  const handleColorChange = (color: ColorResult): void => {
    setState(state => ({ ...state, backgroundColor: color }))
  }

  const togglePalette = (): void => {
    const value = !usePalette
    setUsePalette(value)
    setState(state => ({ ...state, usePalette: value }))
  }

  const saveDefault = (): void => {
    console.log("Saving...")

    setState({ ...state, defaultColor: state.backgroundColor })
  }

  const saveLocalStorage = (): void => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        ...state,
        recentColors: [
          formatColor(state.backgroundColor.hex, state.backgroundColor.rgb.a),
          ...state.recentColors.slice(0, 4),
        ],
      })
    )
  }

  const formatColor = (hex = "#000000", alpha = 1): string => {
    const brightness = Math.round(alpha * 255).toString(16)
    return `${hex}${brightness}` || "black"
  }

  const alpha = state.backgroundColor?.rgb.a || 1
  const hex = state.backgroundColor?.hex || "#000000"

  const useStyles = makeStyles(theme => ({
    text: {
      padding: theme.spacing(2, 2, 0),
      fontSize: "1.5em",
    },
    appBar: {
      backgroundColor: "var(--dark)",
    },
    grow: {
      flexGrow: 1,
    },
    fabButton: {
      position: "absolute",
      zIndex: 1,
      top: -30,
      left: 0,
      right: 0,
      margin: "0 auto",
    },
  }))

  const classes = useStyles()

  const swatchStyles = {
    default: {
      overflow: {
        backgroundColor: "var(--dark)",
      },
    },
  }

  return (
    <div className="page" style={{ background: formatColor(hex, alpha) }}>
      <div className="container">
        <div className="header">
          <Typography className={classes.text} variant="h1" gutterBottom>
            soft light
          </Typography>
        </div>
        <div className="body">
          <div className="pickers">
            {!usePalette && (
              <ChromePicker
                className="picker"
                color={state.backgroundColor.rgb}
                onChange={handleColorChange}
                onChangeComplete={handleColorChange}
              />
            )}
            {usePalette && (
              <SwatchesPicker
                styles={swatchStyles}
                color={state.backgroundColor.rgb}
                onChange={handleColorChange}
                onChangeComplete={handleColorChange}
              />
            )}
          </div>
        </div>
        <div className="footer">
          <AppBar
            position="relative"
            color="primary"
            className={classes.appBar}
          >
            <Toolbar>
              <IconButton
                className="icon"
                edge="start"
                color="inherit"
                aria-label="Colorize"
                onClick={togglePalette}
              >
                <ColorizeIcon />
              </IconButton>
              <Fab
                aria-label="Save"
                className={classes.fabButton}
                style={{
                  background: "var(--light)",
                  color: state.backgroundColor.hex,
                }}
                onClick={saveDefault}
              >
                <Save />
              </Fab>
              <div className={classes.grow} />
              <IconButton
                className="icon"
                edge="end"
                aria-label="Palette"
                color="inherit"
                onClick={togglePalette}
              >
                <PaletteIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        </div>
      </div>
    </div>
  )
}