// lu 并行分解

#include "stdafx.h"
#include <time.h>
#include "mpi.h"
#include <iostream>
using namespace std;

int n;
double **m;
int myid, nprocs;
int i, j, k;
int index;
int namelen;
char processor_name[MPI_MAX_PROCESSOR_NAME];
double local_start, local_finish, local_elapsed, elapsed;
int main(int argc, char * argv[])
{
	
	const int n = 4000;
	MPI_Init(&argc, &argv);
	MPI_Comm_rank(MPI_COMM_WORLD, &myid);	/* get current process id */
	MPI_Comm_size(MPI_COMM_WORLD, &nprocs);	/* get number of processes */
	MPI_Get_processor_name(processor_name, &namelen);
	if (myid == 0)
	{
		fprintf(stderr, "precision of MPI_Wtime(): %f.\n", MPI_Wtick());
		fprintf(stderr, "host name: %s\n", processor_name);
	}
	double local_start = MPI_Wtime();
	int local_n = n / nprocs;
	m = new double*[local_n];
	int *myrow = new int[local_n];

	for (int i = 0; i < local_n; i++) {
		m[i] = new double[n];
		index = myid + nprocs*i;
		myrow[i] = index;
		for (int j = 0; j< n; j++) {
			m[i][j] = exp(-abs(index - j));

		}
	}
	double *tmp = new double[n];

	int cnt = 0;
	for (i = 0; i < n-1; i++)
	{
		if (i == myrow[cnt])
		{
			MPI_Bcast(m[cnt], n, MPI_DOUBLE, myid, MPI_COMM_WORLD);
			for (j = 0; j < n; j++)
			{
				tmp[j] = m[cnt][j];
			}
			cnt++;
		}
		else {
		    // 进程广播
			MPI_Bcast(tmp, n, MPI_DOUBLE, i%nprocs, MPI_COMM_WORLD);
			// 信息，信息长度，信息数据类型，广播目标(此处为全部进程)，广播源
		}

		for (j = cnt; j < local_n; j++)
		{
			double scaling = m[j][i] / tmp[i];
			for (k = i; k < n; k++)
			{
				m[j][k] = m[j][k] - scaling*tmp[k];
			}
		}

	}
	
	double local_finish = MPI_Wtime();
	double local_elapsed = local_finish - local_start;
	printf("Proc%d,local_elapsed time=%e seconds\n", myid, local_elapsed);
	MPI_Reduce(&local_elapsed, &elapsed, 1, MPI_DOUBLE, MPI_MAX, 0, MPI_COMM_WORLD);
	if (myid == 0)
	{
		printf("elapsed time=%e seconds\n", elapsed);
	}
	delete[]myrow;
	
	
	MPI_Finalize();
	
	return 0;


}
