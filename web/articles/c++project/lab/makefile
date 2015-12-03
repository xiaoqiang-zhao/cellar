
# 第一行来调用要执行的任务
edit : a b c /
# 试验成功
#	gcc -o a enter.cpp Wheel.o
# 实验失败
#	gcc -g
#	gcc -static
	gcc main.o
	gcc -o a main.o Plane.o Wheel.o
# 直接使用 g++ -o a main.cpp Plane.cpp Wheel.cpp 成功

# 定义任务：将源代码编译生成中间文件 Plane.o
a : Plane.hpp Plane.cpp
	gcc -c Plane.cpp
# 可指定输出文件名
#	gcc -c Plane.cpp -o PPP.o

# 不写目标文件同样能生成！
b :
	gcc -c Wheel.cpp Wheel.hpp

c :
	gcc -c main.cpp

# 问题：
# 在 main.cpp 中，只要使用输出语句就会 make 失败，是需要链接静态资源吗？怎么链接
#