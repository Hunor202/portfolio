#ifndef ASSOC_H
#define ASSOC_H

#include <iostream>
#include <vector>

int g;

class C
{
    int i;
    int *p;

public:
    C() : i(100), p(&i) {}
    int *asd() const
    {
        // p = &i;
        if (1)
        {
            return &g;
        }
        return p;
    }
};

void f()
{
    const C c;
    int *x = c.asd();
    *x = 42;
}

template <typename Key, typename Container, typename T>
class association
{
private:
    Container &container;
    std::vector<std::pair<Key, typename Container::iterator>> associations;

public:
    association(Container &cont) : container(cont) {};

    void associate(const Key &key, typename Container::iterator it)
    {
        for (auto &pair : associations)
        {
            if (pair.first == key)
            {
                pair.second = it;
                return;
            }
        }
        associations.emplace_back(key, it);
    }

    T &find(const Key &key) const
    {
        for (const auto &pair : associations)
        {
            if (pair.first == key)
            {
                return *(pair.second);
            }
        }
        throw std::out_of_range("Key not found");
    }

    bool has(const Key &key) const
    {
        for (const auto &pair : associations)
        {
            if (pair.first == key)
            {
                return true;
            }
        }
        return false;
    }

    T &operator[](const Key &key)
    {
        for (auto &pair : associations)
        {
            if (pair.first == key)
            {
                return *(pair.second);
            }
        }
        container.push_back(T{});
        auto it = std::prev(container.end());
        associations.emplace_back(key, it);
        return *(it);
    }
};

#endif