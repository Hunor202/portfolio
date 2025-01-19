#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <signal.h>
#include <ctype.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <unistd.h>

void menu();
void fullList();
void filteredList();
void deleteData();
void newProduct();
void modify();
void check(char *type);
void ready();
void produceStarted();
void processing(char *type, int quantity);

int main()
{
    menu();

    return 0;
}

void menu()
{
    system("clear");
    printf("1. Full list\n");
    printf("2. Filtered list\n");
    printf("3. Delete bad product\n");
    printf("4. New product\n");
    printf("5. Modify data\n");
    printf("6. Exit\n");
    printf("Enter the option: ");
    int option;
    scanf("%d", &option);
    if (option != 6)
    {
        switch (option)
        {
        case 1:
            fullList();
            break;
        case 2:
            filteredList();
            break;
        case 3:
            deleteData();
            break;
        case 4:
            newProduct();
            break;
        case 5:
            modify();
            break;
        default:
            printf("The option is invalid!\n");
            break;
        }
    }
}

void fullList()
{
    FILE *ptr;
    ptr = fopen("szolo.dat", "r");
    char ch;

    if (NULL == ptr)
    {
        printf("File can't be opened!\n");
    }

    system("clear");
    while (!feof(ptr))
    {
        ch = fgetc(ptr);
        printf("%c", ch);
    }
    fclose(ptr);

    printf("\nEnter f to go back to the menu!\n");
    fflush(stdin);
    while ((ch = getchar()) != 'f')
    {
    }
    menu();
}

void filteredList()
{
    char name[50];
    system("clear");
    printf("Enter the name of the area: ");
    scanf("%s", name);

    FILE *ptr;
    ptr = fopen("szolo.dat", "r");
    int len = strlen(name);
    char str[100];

    if (NULL == ptr)
    {
        printf("File can't be opened!\n");
    }

    system("clear");
    while (fgets(str, 100, ptr) != NULL)
    {
        bool b = true;
        for (int i = 0; i < len - 1; ++i)
        {
            if (str[i] != name[i])
            {
                b = false;
            }
        }
        if (b)
        {
            printf("%s", str);
        }
    }
    fclose(ptr);

    printf("\nEnter f to go back to the menu!\n");
    fflush(stdin);
    char ch = 0;
    while ((ch = getchar()) != 'f')
    {
    }
    menu();
}

void deleteData()
{
    FILE *ptr1;
    FILE *ptr2;
    ptr1 = fopen("szolo.dat", "r");
    ptr2 = fopen("asd.dat", "w");
    char str[100];

    if (NULL == ptr1)
    {
        printf("File can't be opened!\n");
    }

    int line = 1;
    system("clear");

    while (fgets(str, 100, ptr1) != NULL)
    {
        printf("%d. %s", line, str);
        ++line;
    }

    printf("\nEnter the line you want to delete: ");
    scanf("%d", &line);

    rewind(ptr1);
    while (fgets(str, 100, ptr1) != NULL)
    {
        if (line != 1)
        {
            fprintf(ptr2, str);
        }
        --line;
    }

    fclose(ptr1);
    fclose(ptr2);

    remove("szolo.dat");
    rename("asd.dat", "szolo.dat");

    printf("\nEnter f to go back to the menu!\n");
    fflush(stdin);
    char ch = 0;
    while ((ch = getchar()) != 'f')
    {
    }
    menu();
}

void newProduct()
{
    char area[20];
    char name[20];
    int quantity;
    char type[20];
    system("clear");
    printf("Enter the name of the area: ");
    scanf("%s", &area);
    printf("Enter the name of the producer: ");
    scanf("%s", &name);
    printf("Enter the quantity: ");
    scanf("%i", &quantity);
    printf("Enter the type: ");
    scanf("%s", &type);

    FILE *ptr1;
    FILE *ptr2;
    ptr1 = fopen("szolo.dat", "r");
    ptr2 = fopen("asd.dat", "w");
    char ch;
    char tokens[4][20];
    int token = 0;

    if (NULL == ptr1)
    {
        printf("File can't be opened!\n");
    }

    bool b = true;

    while (!feof(ptr1))
    {
        ch = fgetc(ptr1);

        if (ch == ' ')
        {
            ++token;
        }
        else
        {
            strncat(tokens[token], &ch, 1);
        }
        if (strcmp(tokens[0], area) == 0 && strcmp(tokens[1], name) == 0 && strcmp(tokens[3], type) == 0)
        {
            int a = atoi(tokens[2]);
            a += quantity;
            char str[20];
            sprintf(str, "%d", a);
            strcpy(tokens[2], str);
            b = false;
        }
        if (ch == '\n')
        {
            token = 0;
            char str[100] = "";
            ch = ' ';
            strcat(str, tokens[0]);
            strncat(str, &ch, 1);
            strcat(str, tokens[1]);
            strncat(str, &ch, 1);
            strcat(str, tokens[2]);
            strncat(str, &ch, 1);
            strcat(str, tokens[3]);
            fprintf(ptr2, str);
            strcpy(tokens[0], "");
            strcpy(tokens[1], "");
            strcpy(tokens[2], "");
            strcpy(tokens[3], "");
        }
    }

    char str[100] = "";
    ch = ' ';
    strcat(str, tokens[0]);
    strncat(str, &ch, 1);
    strcat(str, tokens[1]);
    strncat(str, &ch, 1);
    strcat(str, tokens[2]);
    strncat(str, &ch, 1);
    tokens[3][strlen(tokens[3]) - 1] = '\0';
    strcat(str, tokens[3]);
    fprintf(ptr2, str);
    fflush(stdout);
    char s[100] = "\n";
    if (b)
    {
        strcat(s, area);
        strncat(s, &ch, 1);
        strcat(s, name);
        strncat(s, &ch, 1);
        char a[20];
        sprintf(a, "%d", quantity);
        strcat(s, a);
        strncat(s, &ch, 1);
        strcat(s, type);
        fprintf(ptr2, s);
    }

    fclose(ptr1);
    fclose(ptr2);

    remove("szolo.dat");
    rename("asd.dat", "szolo.dat");

    check(type);

    // printf("\nEnter f to go back to the menu!\n");
    // fflush(stdin);
    // while ((ch = getchar()) != 'f')
    // {
    // }
    // menu();
}

void modify()
{
    FILE *ptr1;
    FILE *ptr2;
    ptr1 = fopen("szolo.dat", "r");
    ptr2 = fopen("asd.dat", "w");
    char str[100];

    if (NULL == ptr1)
    {
        printf("File can't be opened!\n");
    }

    int line = 1;
    int data;
    char newData[20] = "";
    system("clear");

    while (fgets(str, 100, ptr1) != NULL)
    {
        printf("%d. %s", line, str);
        ++line;
    }

    printf("\nEnter which line you want to modify: ");
    scanf("%d", &line);
    printf("\nEnter which data you want to modify (1-4): ");
    scanf("%d", &data);
    printf("\nEnter the new data: ");
    scanf("%s", &newData);

    rewind(ptr1);
    while (fgets(str, 100, ptr1) != NULL)
    {
        if (line != 1)
        {
            fprintf(ptr2, str);
        }
        else
        {
            fflush(stdin);
            char *token;
            char ch = ' ';
            token = strtok(str, &ch);
            char s[100] = "";

            while (token != NULL)
            {

                if (data != 1)
                {
                    strcat(s, token);
                    strncat(s, &ch, 1);
                }
                else
                {
                    strcat(s, newData);
                    strncat(s, &ch, 1);
                }
                --data;
                token = strtok(NULL, &ch);
            }
            s[strlen(s) - 1] = '\0';
            fprintf(ptr2, s);
        }
        --line;
    }

    fclose(ptr1);
    fclose(ptr2);

    remove("szolo.dat");
    rename("asd.dat", "szolo.dat");

    printf("\nEnter f to go back to the menu!\n");
    fflush(stdin);
    char ch = 0;
    while ((ch = getchar()) != 'f')
    {
    }
    menu();
}

void ready()
{
    printf("I am ready!\n");
}

void produceStarted()
{
    printf("Produce started!\n");
}

void processing(char *type, int quantity)
{
    signal(SIGUSR1, ready);
    signal(SIGUSR2, produceStarted);
    int pipefd[2];

    if (pipe(pipefd) == -1)
    {
        perror("Pipe error");
        exit(EXIT_FAILURE);
    }

    pid_t child = fork();
    if (child == -1)
    {
        perror("Fork error");
        exit(EXIT_FAILURE);
    }

    if (child > 0)
    {
        pause();
        char msg[100];
        sprintf(msg, "%s %d", type, quantity);
        write(pipefd[1], msg, sizeof(msg));

        pause();
        read(pipefd[0], msg, sizeof(msg));
        close(pipefd[0]);
        close(pipefd[1]);
        printf("Expected wine: %sL\n", msg);

        int status;
        waitpid(child, &status, 0);
        printf("Parent process ended\n");

        printf("\nEnter f to go back to the menu!\n");
        fflush(stdin);
        char ch = 'a';
        while ((ch = getchar()) != 'f')
        {
        }
        menu();
    }
    else
    {
        sleep(1);
        kill(getppid(), SIGUSR1);
        sleep(2); // wait for the data
        char msg[100];
        read(pipefd[0], msg, sizeof(msg));

        const char *numberStr = msg;
        while (*numberStr && !isdigit(*numberStr))
        {
            numberStr++;
        }
        int kg = atoi(numberStr);
        kill(getppid(), SIGUSR2);
        int sleepTime = rand() % 6 + 5;
        sleep(sleepTime);

        double wine = (double)kg * ((double)(rand() % 3 + 6) / 10.0);
        gcvt(wine, 5, msg);
        write(pipefd[1], msg, sizeof(msg));
        close(pipefd[1]);
        close(pipefd[0]);

        printf("Child process ended\n");
    }
}

void check(char *type)
{
    FILE *ptr;
    ptr = fopen("szolo.dat", "r");
    int sumQuantity = 0;
    char actualType[20];
    int actualQuantity = 0;
    if (NULL == ptr)
    {
        printf("File can't be opened!\n");
    }

    bool b = true;

    while (fscanf(ptr, "%*s %*s %d %s", &actualQuantity, &actualType) == 2)
    {
        if (strcmp(type, actualType) == 0)
        {
            sumQuantity += actualQuantity;
        }
    }

    fclose(ptr);

    if (sumQuantity >= 300)
    {
        processing(type, sumQuantity);
    }
    else
    {
        char ch = 'a';
        printf("\nEnter f to go back to the menu!\n");
        fflush(stdin);
        while ((ch = getchar()) != 'f')
        {
        }
        menu();
    }
}