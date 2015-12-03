// 这里定义一个类，在其他文件就可以引用了 #include "Plane.hpp"，测试方法在最末尾给出

// 声明一个飞机类
class Plane {
    public:
	// 方法的定义
    Plane(int speed);
    ~Plane();
    void setSpeed(int speed);
    int getSpeed() const  // 常量函数,不可修改成员变量
    {// 可以直接定义实现
        return speed;
    };
    // 也可在下面定义
    void printCurrentSpeed();
    int speedUp(int num);
    void speedDown(int num);

    private:
    int speed;
    void doSomething();
};