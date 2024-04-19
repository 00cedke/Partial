package main

import (
    "net/http"

    "github.com/labstack/echo/v4"

    "fmt"
)

func main() {
    e := echo.New()

    e.GET("/", func(c echo.Context) error {
        ip := c.RealIP()

        return c.String(http.StatusOK, "IP Addr : "+ip)
    })

    e.Start(":8080")

    fmt.Println("Hello, World!")
}
