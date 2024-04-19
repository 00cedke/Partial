package main

import (
    "net/http"

    "github.com/labstack/echo/v4"
)

// Structure pour représenter une tâche
type Task struct {
    ID    int    `json:"id"`
    Titre string `json:"title"`
    Fait  bool   `json:"done"`
}

// Slice pour stocker les tâches
var tasks []Task

func main() {
    // Création d'une instance de l'objet Echo
    e := echo.New()

    // Route pour récupérer toutes les tâches
    e.GET("/tasks", func(c echo.Context) error {
        return c.JSON(http.StatusOK, tasks)
    })

    // Route pour créer une nouvelle tâche
    e.POST("/tasks", func(c echo.Context) error {
        // Création d'une nouvelle tâche à partir des données reçues
        task := new(Task)
        if err := c.Bind(task); err != nil {
            return err
        }
        // Assignation d'un ID unique à la tâche
        task.ID = len(tasks) + 1
        // Ajout de la tâche à la liste des tâches
        tasks = append(tasks, *task)
        return c.JSON(http.StatusCreated, task)
    })

    // Route pour mettre à jour une tâche existante
    e.PUT("/tasks/:id", func(c echo.Context) error {
        // Récupération de l'ID de la tâche à mettre à jour
        id := c.Param("id")
        // Recherche de la tâche correspondante dans la liste
        for i, task := range tasks {
            if strconv.Itoa(task.ID) == id {
                // Mise à jour de la tâche
                updatedTask := new(Task)
                if err := c.Bind(updatedTask); err != nil {
                    return err
                }
                tasks[i] = *updatedTask
                return c.JSON(http.StatusOK, tasks[i])
            }
        }
        // Retourne une erreur si la tâche n'est pas trouvée
        return echo.NewHTTPError(http.StatusNotFound, "Tâche non trouvée")
    })

    // Route pour supprimer une tâche existante
    e.DELETE("/tasks/:id", func(c echo.Context) error {
        // Récupération de l'ID de la tâche à supprimer
        id := c.Param("id")
        // Recherche de la tâche correspondante dans la liste
        for i, task := range tasks {
            if strconv.Itoa(task.ID) == id {
                // Suppression de la tâche de la liste
                tasks = append(tasks[:i], tasks[i+1:]...)
                return c.NoContent(http.StatusNoContent)
            }
        }
        // Retourne une erreur si la tâche n'est pas trouvée
        return echo.NewHTTPError(http.StatusNotFound, "Tâche non trouvée")
    })

    // Démarrage du serveur Echo
    e.Start(":8080")
}

