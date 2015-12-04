#ifndef WHEEL_H__
#define WHEEL_H__

// 声明一个轮子类
class Wheel {
    public:
    Wheel(int diameter);
    // 也可在下面定义
    int getDiameter();

    private:
    int diameter;
};

#endif // WHEEL_H__

